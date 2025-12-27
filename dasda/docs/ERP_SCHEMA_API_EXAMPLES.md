# ERP Schema API Usage Examples

## Table of Contents

1. [Multi-Tenant Operations](#multi-tenant-operations)
2. [CRUD with Audit Trail](#crud-with-audit-trail)
3. [Workflow Operations](#workflow-operations)
4. [Custom Fields](#custom-fields)
5. [Version History](#version-history)
6. [Advanced Queries](#advanced-queries)

## Multi-Tenant Operations

### Get Tenant Context

```typescript
// Middleware to extract tenant from request
function getTenantFromRequest(req: Request): string {
  // From subdomain: tenant.example.com
  const subdomain = req.headers.host?.split('.')[0];
  
  // From header
  const tenantId = req.headers['x-tenant-id'];
  
  // From JWT token
  const token = req.headers.authorization?.split(' ')[1];
  const decoded = jwt.verify(token, secret);
  return decoded.tenantId;
}

// Get tenant with validation
async function getTenant(tenantId: string) {
  const tenant = await prisma.tenant.findUnique({
    where: { id: tenantId, isActive: true }
  });
  
  if (!tenant) {
    throw new Error('Tenant not found or inactive');
  }
  
  return tenant;
}
```

### Tenant-Scoped Queries

```typescript
// Service class with tenant context
class JobService {
  constructor(private tenantId: string) {}
  
  async getJobs(filters: JobFilters) {
    return await prisma.job.findMany({
      where: {
        tenantId: this.tenantId,  // Always include tenantId
        ...filters,
        deletedAt: null,
        archivedAt: null
      },
      include: {
        company: {
          select: { name: true, logoUrl: true }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: filters.limit || 20,
      skip: filters.offset || 0
    });
  }
  
  async createJob(data: CreateJobInput) {
    return await prisma.job.create({
      data: {
        ...data,
        tenantId: this.tenantId,  // Inject tenantId
        createdBy: this.userId,
        version: 1
      }
    });
  }
}
```

## CRUD with Audit Trail

### Create with Full Audit Trail

```typescript
async function createJobWithAudit(
  tenantId: string,
  userId: string,
  data: CreateJobInput,
  requestIp?: string,
  userAgent?: string
) {
  return await prisma.$transaction(async (tx) => {
    // 1. Create job
    const job = await tx.job.create({
      data: {
        ...data,
        tenantId,
        createdBy: userId,
        version: 1
      }
    });
    
    // 2. Create audit log
    await tx.auditLog.create({
      data: {
        tenantId,
        entityType: 'Job',
        entityId: job.id,
        action: 'CREATE',
        changes: { after: job },
        userId,
        ipAddress: requestIp,
        userAgent,
        metadata: {
          source: 'api',
          endpoint: '/api/jobs'
        }
      }
    });
    
    // 3. Create version history
    await tx.versionHistory.create({
      data: {
        entityType: 'Job',
        entityId: job.id,
        version: 1,
        changes: job,
        changeType: 'CREATE',
        changedBy: userId
      }
    });
    
    return job;
  });
}
```

### Update with Optimistic Locking and Audit

```typescript
async function updateJobWithAudit(
  jobId: string,
  tenantId: string,
  userId: string,
  currentVersion: number,
  updates: UpdateJobInput,
  requestIp?: string
) {
  return await prisma.$transaction(async (tx) => {
    // 1. Get current state
    const currentJob = await tx.job.findUnique({
      where: { id: jobId, tenantId }
    });
    
    if (!currentJob) {
      throw new Error('Job not found');
    }
    
    if (currentJob.version !== currentVersion) {
      throw new Error('Version mismatch. Please refresh and try again.');
    }
    
    // 2. Prepare changes for audit
    const changes: Record<string, any> = {};
    Object.keys(updates).forEach(key => {
      if (currentJob[key] !== updates[key]) {
        changes[key] = {
          before: currentJob[key],
          after: updates[key]
        };
      }
    });
    
    // 3. Update job
    const updatedJob = await tx.job.update({
      where: {
        id: jobId,
        version: currentVersion
      },
      data: {
        ...updates,
        version: { increment: 1 },
        updatedBy: userId
      }
    });
    
    // 4. Create audit log
    await tx.auditLog.create({
      data: {
        tenantId,
        entityType: 'Job',
        entityId: jobId,
        action: 'UPDATE',
        changes,
        userId,
        ipAddress: requestIp,
        metadata: {
          version: { from: currentVersion, to: currentVersion + 1 }
        }
      }
    });
    
    // 5. Create version history
    await tx.versionHistory.create({
      data: {
        entityType: 'Job',
        entityId: jobId,
        version: currentVersion + 1,
        changes: updatedJob,
        changeType: 'UPDATE',
        changedBy: userId
      }
    });
    
    return updatedJob;
  });
}
```

### Soft Delete with Audit

```typescript
async function deleteJobWithAudit(
  jobId: string,
  tenantId: string,
  userId: string,
  reason?: string
) {
  return await prisma.$transaction(async (tx) => {
    const job = await tx.job.findUnique({
      where: { id: jobId, tenantId }
    });
    
    // Soft delete
    const deletedJob = await tx.job.update({
      where: { id: jobId },
      data: {
        deletedAt: new Date(),
        updatedBy: userId,
        version: { increment: 1 }
      }
    });
    
    // Audit log
    await tx.auditLog.create({
      data: {
        tenantId,
        entityType: 'Job',
        entityId: jobId,
        action: 'DELETE',
        changes: { before: job },
        userId,
        metadata: { reason }
      }
    });
    
    // Version history
    await tx.versionHistory.create({
      data: {
        entityType: 'Job',
        entityId: jobId,
        version: deletedJob.version,
        changes: deletedJob,
        changeType: 'DELETE',
        changedBy: userId,
        changeReason: reason
      }
    });
    
    return deletedJob;
  });
}
```

## Workflow Operations

### Create and Start Workflow

```typescript
async function createJobApprovalWorkflow(
  tenantId: string,
  name: string,
  steps: WorkflowStepInput[]
) {
  return await prisma.workflow.create({
    data: {
      tenantId,
      name,
      entityType: 'Job',
      isDefault: true,
      steps: {
        create: steps.map((step, index) => ({
          stepOrder: index + 1,
          name: step.name,
          approverRoleId: step.approverRoleId,
          isRequired: step.isRequired,
          canSkip: step.canSkip || false
        }))
      }
    },
    include: { steps: true }
  });
}

async function startWorkflowForJob(
  jobId: string,
  tenantId: string,
  userId: string
) {
  // Get default workflow
  const workflow = await prisma.workflow.findFirst({
    where: {
      tenantId,
      entityType: 'Job',
      isDefault: true,
      isActive: true
    },
    include: { steps: { orderBy: { stepOrder: 'asc' } } }
  });
  
  if (!workflow) {
    throw new Error('No default workflow found');
  }
  
  // Create workflow instance
  const instance = await prisma.workflowInstance.create({
    data: {
      workflowId: workflow.id,
      entityType: 'Job',
      entityId: jobId,
      status: 'PENDING',
      startedBy: userId,
      currentStepId: workflow.steps[0].id
    },
    include: {
      workflow: { include: { steps: true } },
      currentStep: true
    }
  });
  
  // Audit log
  await prisma.auditLog.create({
    data: {
      tenantId,
      entityType: 'WorkflowInstance',
      entityId: instance.id,
      action: 'CREATE',
      changes: { after: instance },
      userId
    }
  });
  
  return instance;
}
```

### Approve Workflow Step

```typescript
async function approveWorkflowStep(
  instanceId: string,
  tenantId: string,
  userId: string,
  userRoleId: string,
  comment?: string
) {
  return await prisma.$transaction(async (tx) => {
    const instance = await tx.workflowInstance.findUnique({
      where: { id: instanceId },
      include: {
        workflow: { include: { steps: { orderBy: { stepOrder: 'asc' } } } },
        currentStep: true
      }
    });
    
    if (!instance || instance.status !== 'PENDING') {
      throw new Error('Invalid workflow instance');
    }
    
    // Verify user has permission
    const currentStep = instance.currentStep;
    if (currentStep?.approverRoleId !== userRoleId) {
      throw new Error('User does not have permission to approve this step');
    }
    
    // Find next step
    const currentStepIndex = instance.workflow.steps.findIndex(
      s => s.id === currentStep.id
    );
    const nextStep = instance.workflow.steps[currentStepIndex + 1];
    const isLastStep = !nextStep;
    
    // Update instance
    const updated = await tx.workflowInstance.update({
      where: { id: instanceId },
      data: {
        currentStepId: nextStep?.id || null,
        status: isLastStep ? 'APPROVED' : 'IN_PROGRESS',
        completedBy: userId,
        completedAt: new Date()
      }
    });
    
    // If approved, update job status
    if (isLastStep) {
      await tx.job.update({
        where: { id: instance.entityId },
        data: {
          status: 'PUBLISHED',
          publishedAt: new Date(),
          updatedBy: userId
        }
      });
    }
    
    // Audit log
    await tx.auditLog.create({
      data: {
        tenantId,
        entityType: 'WorkflowInstance',
        entityId: instanceId,
        action: 'APPROVE',
        changes: {
          before: { status: instance.status, currentStepId: instance.currentStepId },
          after: { status: updated.status, currentStepId: updated.currentStepId }
        },
        userId,
        metadata: { comment, stepName: currentStep.name }
      }
    });
    
    return updated;
  });
}
```

## Custom Fields

### Define Custom Fields

```typescript
async function defineCustomFields(
  tenantId: string,
  entityType: string,
  fields: CustomFieldDefinition[]
) {
  return await prisma.$transaction(async (tx) => {
    const createdFields = [];
    
    for (const field of fields) {
      const customField = await tx.customField.create({
        data: {
          tenantId,
          entityType,
          name: field.name,
          label: field.label,
          fieldType: field.fieldType,
          isRequired: field.isRequired || false,
          defaultValue: field.defaultValue,
          validationRules: field.validationRules,
          options: field.options, // For SELECT types
          displayOrder: field.displayOrder || 0,
          isVisible: field.isVisible !== false
        }
      });
      
      createdFields.push(customField);
    }
    
    return createdFields;
  });
}
```

### Set Custom Field Values

```typescript
async function setCustomFieldValue(
  customFieldId: string,
  entityType: string,
  entityId: string,
  value: any
) {
  const customField = await prisma.customField.findUnique({
    where: { id: customFieldId }
  });
  
  if (!customField) {
    throw new Error('Custom field not found');
  }
  
  // Prepare value based on field type
  const valueData: any = {};
  
  switch (customField.fieldType) {
    case 'TEXT':
      valueData.textValue = String(value);
      break;
    case 'NUMBER':
      valueData.numberValue = Number(value);
      break;
    case 'DATE':
      valueData.dateValue = new Date(value);
      break;
    case 'BOOLEAN':
      valueData.booleanValue = Boolean(value);
      break;
    case 'JSON':
    case 'SELECT':
    case 'MULTI_SELECT':
      valueData.jsonValue = value;
      break;
  }
  
  return await prisma.customFieldValue.upsert({
    where: {
      customFieldId_entityType_entityId: {
        customFieldId,
        entityType,
        entityId
      }
    },
    create: {
      customFieldId,
      entityType,
      entityId,
      ...valueData
    },
    update: {
      ...valueData,
      updatedAt: new Date()
    }
  });
}
```

### Get Entity with Custom Fields

```typescript
async function getJobWithCustomFields(jobId: string, tenantId: string) {
  const job = await prisma.job.findUnique({
    where: { id: jobId, tenantId },
    include: {
      company: true
    }
  });
  
  // Get custom fields for Job entity type
  const customFields = await prisma.customField.findMany({
    where: {
      tenantId,
      entityType: 'Job',
      isVisible: true
    },
    orderBy: { displayOrder: 'asc' }
  });
  
  // Get custom field values
  const customFieldValues = await prisma.customFieldValue.findMany({
    where: {
      entityType: 'Job',
      entityId: jobId,
      customFieldId: { in: customFields.map(f => f.id) }
    },
    include: { customField: true }
  });
  
  return {
    ...job,
    customFields: customFields.map(field => {
      const value = customFieldValues.find(v => v.customFieldId === field.id);
      return {
        ...field,
        value: value ? getFieldValue(value, field.fieldType) : field.defaultValue
      };
    })
  };
}

function getFieldValue(value: CustomFieldValue, fieldType: CustomFieldType): any {
  switch (fieldType) {
    case 'TEXT': return value.textValue;
    case 'NUMBER': return value.numberValue;
    case 'DATE': return value.dateValue;
    case 'BOOLEAN': return value.booleanValue;
    default: return value.jsonValue;
  }
}
```

## Version History

### Get Version History

```typescript
async function getVersionHistory(
  entityType: string,
  entityId: string,
  tenantId?: string
) {
  return await prisma.versionHistory.findMany({
    where: {
      entityType,
      entityId,
      // Optionally filter by tenant if needed
    },
    orderBy: { version: 'desc' },
    include: {
      user: {
        select: { email: true, firstName: true, lastName: true }
      }
    }
  });
}
```

### Rollback to Previous Version

```typescript
async function rollbackToVersion(
  entityType: string,
  entityId: string,
  targetVersion: number,
  userId: string,
  reason?: string
) {
  return await prisma.$transaction(async (tx) => {
    // Get target version
    const targetVersionData = await tx.versionHistory.findUnique({
      where: {
        entityType_entityId_version: {
          entityType,
          entityId,
          version: targetVersion
        }
      }
    });
    
    if (!targetVersionData) {
      throw new Error('Version not found');
    }
    
    // Get current entity
    const currentEntity = await tx[entityType.toLowerCase()].findUnique({
      where: { id: entityId }
    });
    
    // Restore from version
    const restored = await tx[entityType.toLowerCase()].update({
      where: { id: entityId },
      data: {
        ...targetVersionData.changes,
        version: { increment: 1 },
        updatedBy: userId
      }
    });
    
    // Create new version history entry
    await tx.versionHistory.create({
      data: {
        entityType,
        entityId,
        version: restored.version,
        changes: restored,
        changeType: 'UPDATE',
        changedBy: userId,
        changeReason: `Rollback to version ${targetVersion}. ${reason || ''}`
      }
    });
    
    // Audit log
    await tx.auditLog.create({
      data: {
        entityType,
        entityId,
        action: 'UPDATE',
        changes: {
          before: currentEntity,
          after: restored
        },
        userId,
        metadata: {
          rollback: true,
          fromVersion: currentEntity.version,
          toVersion: targetVersion
        }
      }
    });
    
    return restored;
  });
}
```

## Advanced Queries

### Search with Filters

```typescript
async function searchJobs(
  tenantId: string,
  searchParams: {
    query?: string;
    status?: JobStatus[];
    companyId?: string;
    minSalary?: number;
    maxSalary?: number;
    location?: string;
    limit?: number;
    offset?: number;
  }
) {
  const where: any = {
    tenantId,
    deletedAt: null,
    archivedAt: null
  };
  
  // Text search
  if (searchParams.query) {
    where.OR = [
      { title: { contains: searchParams.query, mode: 'insensitive' } },
      { description: { contains: searchParams.query, mode: 'insensitive' } }
    ];
  }
  
  // Status filter
  if (searchParams.status?.length) {
    where.status = { in: searchParams.status };
  }
  
  // Company filter
  if (searchParams.companyId) {
    where.companyId = searchParams.companyId;
  }
  
  // Salary range
  if (searchParams.minSalary || searchParams.maxSalary) {
    where.OR = [
      ...(where.OR || []),
      {
        AND: [
          ...(searchParams.minSalary ? [{ minSalary: { gte: searchParams.minSalary } }] : []),
          ...(searchParams.maxSalary ? [{ maxSalary: { lte: searchParams.maxSalary } }] : [])
        ]
      }
    ];
  }
  
  // Location filter
  if (searchParams.location) {
    where.OR = [
      ...(where.OR || []),
      { location: { contains: searchParams.location, mode: 'insensitive' } },
      { city: { contains: searchParams.location, mode: 'insensitive' } },
      { state: { contains: searchParams.location, mode: 'insensitive' } }
    ];
  }
  
  return await prisma.job.findMany({
    where,
    include: {
      company: {
        select: { name: true, logoUrl: true }
      }
    },
    orderBy: { createdAt: 'desc' },
    take: searchParams.limit || 20,
    skip: searchParams.offset || 0
  });
}
```

### Aggregation Queries

```typescript
async function getJobStatistics(tenantId: string, dateRange?: { start: Date; end: Date }) {
  const where: any = {
    tenantId,
    deletedAt: null
  };
  
  if (dateRange) {
    where.createdAt = {
      gte: dateRange.start,
      lte: dateRange.end
    };
  }
  
  const [total, byStatus, byCompany] = await Promise.all([
    // Total jobs
    prisma.job.count({ where }),
    
    // Jobs by status
    prisma.job.groupBy({
      by: ['status'],
      where,
      _count: true
    }),
    
    // Top companies by job count
    prisma.job.groupBy({
      by: ['companyId'],
      where,
      _count: true,
      orderBy: { _count: { companyId: 'desc' } },
      take: 10
    })
  ]);
  
  return {
    total,
    byStatus: byStatus.reduce((acc, item) => {
      acc[item.status] = item._count;
      return acc;
    }, {} as Record<string, number>),
    topCompanies: byCompany
  };
}
```

---

**API Examples Version**: 1.0.0
