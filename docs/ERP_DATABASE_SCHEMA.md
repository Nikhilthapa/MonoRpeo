# ERP-Level Scalable Database Schema Documentation

## Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Multi-Tenancy](#multi-tenancy)
4. [Audit Trail System](#audit-trail-system)
5. [Dynamic Fields System](#dynamic-fields-system)
6. [Workflow Management](#workflow-management)
7. [Version History](#version-history)
8. [Performance Optimizations](#performance-optimizations)
9. [Usage Examples](#usage-examples)
10. [Best Practices](#best-practices)
11. [Migration Guide](#migration-guide)

## Overview

This database schema is designed for enterprise-level scalability, supporting millions of records with advanced features including:

- **Multi-tenancy** with complete data isolation
- **Complete audit trails** for compliance and tracking
- **Dynamic fields** for extensibility without schema changes
- **Workflow management** for approval processes
- **Version history** for change tracking and rollback
- **Optimistic locking** for high-concurrency scenarios
- **Advanced indexing** for optimal query performance

## Architecture

### Core Principles

1. **Single Database, Multi-Tenant**: One database with tenant isolation via `tenantId`
2. **Audit Everything**: All critical operations are logged
3. **Extensible by Design**: JSON metadata fields and custom fields for flexibility
4. **Performance First**: Comprehensive indexing strategy for scale
5. **Soft Deletes**: Data preservation with `deletedAt` and `archivedAt`

### Schema Organization

```
prisma/schema.prisma
├── Shared Enums
│   ├── PermissionScope
│   ├── JobStatus
│   ├── ApplicationStatus
│   ├── AuditAction
│   ├── WorkflowStatus
│   └── CustomFieldType
├── ERP Foundation
│   ├── Tenant (Multi-tenancy)
│   └── AuditLog (Audit trails)
├── Auth Category
│   ├── User
│   ├── SystemRole
│   ├── SystemPermission
│   └── Related models
├── Job Category
│   ├── Job
│   ├── JobApplication
│   ├── SavedJob
│   └── JobSkill
├── Company Category
│   ├── Company
│   ├── CompanyUser
│   ├── CompanyRole
│   └── CompanyPermission
├── Vendor Category
│   ├── Vendor
│   ├── VendorUser
│   ├── VendorRole
│   └── VendorPermission
└── ERP Systems
    ├── Workflow (Approval workflows)
    ├── WorkflowStep
    ├── WorkflowInstance
    ├── VersionHistory (Change tracking)
    ├── CustomField (Dynamic fields)
    └── CustomFieldValue
```

## Multi-Tenancy

### Tenant Model

The `Tenant` model provides organization-level isolation:

```prisma
model Tenant {
  id          String  @id @default(cuid())
  name        String
  slug        String  @unique
  email       String  @unique
  
  // Subscription & Billing
  subscriptionPlan String?
  subscriptionStatus String?
  subscriptionStartDate DateTime?
  subscriptionEndDate DateTime?
  maxUsers Int? @default(10)
  maxJobs Int? @default(100)
  
  // Settings
  settings Json? // Tenant-specific settings
  features Json? // Enabled features
  
  // Status
  isActive Boolean @default(true)
  isVerified Boolean @default(false)
}
```

### Tenant Isolation

Models with tenant isolation:
- `User` - Users belong to a tenant
- `Company` - Companies belong to a tenant
- `Vendor` - Vendors belong to a tenant
- `Job` - Jobs belong to a tenant
- `CustomField` - Fields can be tenant-specific
- `Workflow` - Workflows can be tenant-specific

### Querying with Tenant Isolation

```typescript
// Always filter by tenantId for tenant-scoped queries
const jobs = await prisma.job.findMany({
  where: {
    tenantId: currentTenantId,
    status: 'PUBLISHED',
    deletedAt: null
  }
});

// Use composite indexes for optimal performance
// Index: [tenantId, status, deletedAt]
```

### Best Practices

1. **Always filter by tenantId** in application code
2. **Use middleware** to inject tenantId from authentication
3. **Validate tenant access** before operations
4. **Use unique constraints** with tenantId: `@@unique([tenantId, email])`

## Audit Trail System

### AuditLog Model

Tracks all CRUD operations with complete context:

```prisma
model AuditLog {
  id         String     @id @default(cuid())
  tenantId   String?    // Optional for system-level audits
  
  // Entity Information
  entityType String     // e.g., "User", "Job", "Company"
  entityId   String
  
  // Action Details
  action     AuditAction // CREATE, UPDATE, DELETE, VIEW, APPROVE, etc.
  changes    Json?      // Before/after values
  metadata   Json?      // Additional context
  
  // User Tracking
  userId     String?
  userEmail  String?
  ipAddress  String?
  userAgent  String?
  
  createdAt  DateTime @default(now())
}
```

### Creating Audit Logs

```typescript
// Example: Log a user update
await prisma.auditLog.create({
  data: {
    tenantId: currentTenantId,
    entityType: 'User',
    entityId: userId,
    action: 'UPDATE',
    changes: {
      before: { email: 'old@example.com' },
      after: { email: 'new@example.com' }
    },
    userId: currentUserId,
    userEmail: currentUserEmail,
    ipAddress: requestIp,
    userAgent: request.headers['user-agent'],
    metadata: {
      reason: 'Email update requested by user'
    }
  }
});
```

### Querying Audit Logs

```typescript
// Get audit history for an entity
const auditHistory = await prisma.auditLog.findMany({
  where: {
    entityType: 'Job',
    entityId: jobId,
    tenantId: currentTenantId
  },
  orderBy: { createdAt: 'desc' },
  include: {
    user: {
      select: { email: true, firstName: true, lastName: true }
    }
  }
});

// Get all actions by a user
const userActions = await prisma.auditLog.findMany({
  where: {
    userId: userId,
    tenantId: currentTenantId,
    createdAt: {
      gte: startDate,
      lte: endDate
    }
  }
});
```

### Audit Fields on Models

All models include audit fields:

- `createdBy` - User ID who created the record
- `updatedBy` - User ID who last updated the record
- `version` - Version number for optimistic locking

```typescript
// When creating a record
await prisma.job.create({
  data: {
    // ... job data
    createdBy: currentUserId,
    version: 1
  }
});

// When updating a record
await prisma.job.update({
  where: { id: jobId },
  data: {
    // ... update data
    updatedBy: currentUserId,
    version: { increment: 1 } // Increment for optimistic locking
  }
});
```

## Dynamic Fields System

### CustomField Model

Define dynamic fields per entity type:

```prisma
model CustomField {
  id         String         @id @default(cuid())
  tenantId   String?       // Null for global fields
  entityType String        // e.g., "User", "Job", "Company"
  name       String
  label      String
  fieldType  CustomFieldType // TEXT, NUMBER, DATE, BOOLEAN, SELECT, etc.
  
  // Configuration
  isRequired Boolean @default(false)
  defaultValue String?
  validationRules Json?
  options     Json?    // For SELECT/MULTI_SELECT
  
  displayOrder Int @default(0)
  isVisible    Boolean @default(true)
}
```

### CustomFieldValue Model

Store values for dynamic fields:

```prisma
model CustomFieldValue {
  id            String  @id @default(cuid())
  customFieldId String
  entityType    String
  entityId      String
  
  // Value Storage (flexible based on field type)
  textValue     String?
  numberValue   Decimal?
  dateValue     DateTime?
  booleanValue  Boolean?
  jsonValue     Json?
}
```

### Usage Example

```typescript
// 1. Define a custom field
const customField = await prisma.customField.create({
  data: {
    tenantId: currentTenantId,
    entityType: 'Job',
    name: 'remote_work_percentage',
    label: 'Remote Work Percentage',
    fieldType: 'NUMBER',
    isRequired: false,
    validationRules: {
      min: 0,
      max: 100
    }
  }
});

// 2. Set a value for a job
await prisma.customFieldValue.create({
  data: {
    customFieldId: customField.id,
    entityType: 'Job',
    entityId: jobId,
    numberValue: 80
  }
});

// 3. Query job with custom fields
const job = await prisma.job.findUnique({
  where: { id: jobId },
  include: {
    // Get custom field values
    // Note: This requires a relation or manual query
  }
});

// Alternative: Use metadata JSON field
await prisma.job.update({
  where: { id: jobId },
  data: {
    metadata: {
      remoteWorkPercentage: 80,
      customField1: 'value1'
    }
  }
});
```

### Metadata JSON Fields

All key models include a `metadata` JSON field for quick extensibility:

```typescript
// Store custom data without defining fields
await prisma.user.update({
  where: { id: userId },
  data: {
    metadata: {
      preferredLanguage: 'en',
      timezone: 'UTC',
      customAttributes: {
        department: 'Engineering',
        level: 'Senior'
      }
    }
  }
});
```

## Workflow Management

### Workflow System

The workflow system supports multi-step approval processes:

```prisma
model Workflow {
  id          String  @id @default(cuid())
  tenantId    String?
  name        String
  entityType  String  // e.g., "Job", "Company"
  isActive    Boolean @default(true)
  isDefault   Boolean @default(false)
}

model WorkflowStep {
  id         String  @id @default(cuid())
  workflowId String
  stepOrder  Int
  name       String
  approverRoleId String?
  isRequired Boolean @default(true)
  canSkip    Boolean @default(false)
}

model WorkflowInstance {
  id         String        @id @default(cuid())
  workflowId String
  entityType String
  entityId   String
  currentStepId String?
  status     WorkflowStatus // PENDING, IN_PROGRESS, APPROVED, REJECTED
  startedBy   String?
  completedBy String?
}
```

### Creating a Workflow

```typescript
// 1. Create workflow definition
const workflow = await prisma.workflow.create({
  data: {
    tenantId: currentTenantId,
    name: 'Job Approval Workflow',
    entityType: 'Job',
    isDefault: true,
    steps: {
      create: [
        {
          stepOrder: 1,
          name: 'HR Review',
          approverRoleId: hrRoleId,
          isRequired: true
        },
        {
          stepOrder: 2,
          name: 'Manager Approval',
          approverRoleId: managerRoleId,
          isRequired: true
        },
        {
          stepOrder: 3,
          name: 'Final Approval',
          approverRoleId: directorRoleId,
          isRequired: true
        }
      ]
    }
  }
});

// 2. Start workflow instance for a job
const workflowInstance = await prisma.workflowInstance.create({
  data: {
    workflowId: workflow.id,
    entityType: 'Job',
    entityId: jobId,
    status: 'PENDING',
    startedBy: currentUserId,
    currentStepId: workflow.steps[0].id
  }
});

// 3. Approve a step
await prisma.workflowInstance.update({
  where: { id: workflowInstanceId },
  data: {
    currentStepId: nextStepId,
    status: currentStep === lastStep ? 'APPROVED' : 'IN_PROGRESS',
    completedBy: currentUserId,
    completedAt: new Date()
  }
});
```

## Version History

### VersionHistory Model

Tracks entity changes over time:

```prisma
model VersionHistory {
  id         String  @id @default(cuid())
  entityType String
  entityId   String
  version    Int
  changes    Json    // Snapshot of entity
  changeType String  // "CREATE", "UPDATE", "DELETE"
  changedBy  String?
  changeReason String?
  createdAt DateTime @default(now())
}
```

### Usage Example

```typescript
// Create version snapshot on update
const currentJob = await prisma.job.findUnique({
  where: { id: jobId }
});

await prisma.job.update({
  where: { id: jobId },
  data: {
    // ... updates
    version: { increment: 1 }
  }
});

// Create version history entry
await prisma.versionHistory.create({
  data: {
    entityType: 'Job',
    entityId: jobId,
    version: currentJob.version + 1,
    changes: currentJob, // Full entity snapshot
    changeType: 'UPDATE',
    changedBy: currentUserId,
    changeReason: 'Updated job requirements'
  }
});

// Rollback to previous version
const previousVersion = await prisma.versionHistory.findFirst({
  where: {
    entityType: 'Job',
    entityId: jobId,
    version: { lt: currentVersion }
  },
  orderBy: { version: 'desc' }
});

await prisma.job.update({
  where: { id: jobId },
  data: {
    ...previousVersion.changes,
    version: previousVersion.version + 1
  }
});
```

## Performance Optimizations

### Indexing Strategy

#### Composite Indexes

```prisma
// Tenant + Status + DeletedAt (most common query pattern)
@@index([tenantId, status, deletedAt])

// Tenant + Active Status
@@index([tenantId, isActive, deletedAt])

// Entity + Status
@@index([companyId, status])
@@index([userId, status])
```

#### Partial Indexes

PostgreSQL supports partial indexes (add via raw SQL):

```sql
-- Index only active records
CREATE INDEX idx_jobs_active ON jobs(tenant_id, status) 
WHERE deleted_at IS NULL AND archived_at IS NULL;

-- Index only verified companies
CREATE INDEX idx_companies_verified ON companies(tenant_id, is_active) 
WHERE is_verified = true AND deleted_at IS NULL;
```

### Query Optimization Tips

1. **Always include tenantId** in WHERE clauses
2. **Use composite indexes** for multi-column filters
3. **Filter deletedAt IS NULL** early in queries
4. **Use select** to limit returned fields
5. **Use pagination** for large result sets

```typescript
// Optimized query using composite index
const jobs = await prisma.job.findMany({
  where: {
    tenantId: currentTenantId,      // Uses composite index
    status: 'PUBLISHED',            // Uses composite index
    deletedAt: null                 // Uses composite index
  },
  select: {
    id: true,
    title: true,
    status: true
    // Only select needed fields
  },
  take: 20,                         // Pagination
  skip: 0,
  orderBy: { createdAt: 'desc' }
});
```

### Optimistic Locking

Prevent concurrent update conflicts:

```typescript
// Update with version check
try {
  const job = await prisma.job.update({
    where: {
      id: jobId,
      version: currentVersion // Fails if version changed
    },
    data: {
      title: 'New Title',
      version: { increment: 1 },
      updatedBy: currentUserId
    }
  });
} catch (error) {
  if (error.code === 'P2025') {
    // Record was modified by another user
    throw new Error('Record was modified. Please refresh and try again.');
  }
}
```

## Usage Examples

### Complete CRUD with Audit Trail

```typescript
// Create with audit trail
const job = await prisma.$transaction(async (tx) => {
  // Create job
  const newJob = await tx.job.create({
    data: {
      tenantId: currentTenantId,
      companyId: companyId,
      title: 'Senior Developer',
      status: 'DRAFT',
      createdBy: currentUserId,
      version: 1,
      metadata: {
        source: 'internal',
        priority: 'high'
      }
    }
  });

  // Create audit log
  await tx.auditLog.create({
    data: {
      tenantId: currentTenantId,
      entityType: 'Job',
      entityId: newJob.id,
      action: 'CREATE',
      changes: { after: newJob },
      userId: currentUserId,
      ipAddress: requestIp
    }
  });

  // Create version history
  await tx.versionHistory.create({
    data: {
      entityType: 'Job',
      entityId: newJob.id,
      version: 1,
      changes: newJob,
      changeType: 'CREATE',
      changedBy: currentUserId
    }
  });

  return newJob;
});

// Update with optimistic locking
const updatedJob = await prisma.$transaction(async (tx) => {
  const currentJob = await tx.job.findUnique({
    where: { id: jobId }
  });

  const updated = await tx.job.update({
    where: {
      id: jobId,
      version: currentJob.version
    },
    data: {
      title: 'Updated Title',
      version: { increment: 1 },
      updatedBy: currentUserId
    }
  });

  // Audit log
  await tx.auditLog.create({
    data: {
      tenantId: currentTenantId,
      entityType: 'Job',
      entityId: jobId,
      action: 'UPDATE',
      changes: {
        before: { title: currentJob.title },
        after: { title: updated.title }
      },
      userId: currentUserId
    }
  });

  return updated;
});
```

### Multi-Tenant Query Pattern

```typescript
// Always scope queries by tenant
async function getTenantJobs(tenantId: string, filters: JobFilters) {
  return await prisma.job.findMany({
    where: {
      tenantId: tenantId,           // Required for isolation
      status: filters.status,
      deletedAt: null,               // Soft delete filter
      archivedAt: null,              // Archive filter
      ...(filters.companyId && { companyId: filters.companyId })
    },
    include: {
      company: {
        select: {
          name: true,
          logoUrl: true
        }
      }
    },
    orderBy: { createdAt: 'desc' },
    take: filters.limit || 20,
    skip: filters.offset || 0
  });
}
```

## Best Practices

### 1. Tenant Isolation

- ✅ Always filter by `tenantId`
- ✅ Use middleware to inject tenant context
- ✅ Validate tenant access before operations
- ❌ Never query without tenantId filter

### 2. Audit Trails

- ✅ Log all CREATE, UPDATE, DELETE operations
- ✅ Include before/after values for updates
- ✅ Store user context (userId, IP, userAgent)
- ✅ Use transactions for atomic audit logging

### 3. Soft Deletes

- ✅ Always filter `deletedAt IS NULL` in queries
- ✅ Use `archivedAt` for data lifecycle management
- ✅ Consider archiving old data to separate tables
- ❌ Don't hard delete unless required by law

### 4. Optimistic Locking

- ✅ Use `version` field for concurrent updates
- ✅ Check version before updates
- ✅ Handle P2025 errors gracefully
- ✅ Increment version on every update

### 5. Performance

- ✅ Use composite indexes for common query patterns
- ✅ Limit SELECT fields to needed data
- ✅ Use pagination for large result sets
- ✅ Consider materialized views for complex aggregations

### 6. Dynamic Fields

- ✅ Use `metadata` JSON for simple custom data
- ✅ Use `CustomField` for structured, validated fields
- ✅ Cache custom field definitions
- ✅ Index frequently queried custom field values

### 7. Workflows

- ✅ Define workflows per entity type
- ✅ Track workflow state in `WorkflowInstance`
- ✅ Log workflow transitions in audit log
- ✅ Handle workflow timeouts and escalations

## Migration Guide

### Initial Migration

```bash
# Generate migration
npm run prisma:migrate dev --name init_erp_schema

# Apply migration
npm run prisma:migrate deploy
```

### Adding Tenant Isolation to Existing Data

```typescript
// Migration script: Assign default tenant to existing records
const defaultTenant = await prisma.tenant.findFirst({
  where: { slug: 'default' }
});

await prisma.user.updateMany({
  where: { tenantId: null },
  data: { tenantId: defaultTenant.id }
});
```

### Enabling Audit Logs

```typescript
// Middleware to automatically create audit logs
prisma.$use(async (params, next) => {
  const result = await next(params);
  
  if (['create', 'update', 'delete'].includes(params.action)) {
    await prisma.auditLog.create({
      data: {
        tenantId: params.args.data?.tenantId,
        entityType: params.model,
        entityId: result.id,
        action: params.action.toUpperCase(),
        changes: params.args.data,
        userId: currentUserId
      }
    });
  }
  
  return result;
});
```

## Schema Statistics

- **Total Models**: 25+
- **ERP Models**: 8 (Tenant, AuditLog, Workflow, WorkflowStep, WorkflowInstance, VersionHistory, CustomField, CustomFieldValue)
- **Indexes**: 50+ composite and single-column indexes
- **Enums**: 6 (PermissionScope, JobStatus, ApplicationStatus, AuditAction, WorkflowStatus, CustomFieldType)
- **Relationships**: Complete audit trail and workflow relationships

## Support & Maintenance

### Regular Maintenance Tasks

1. **Archive old audit logs** (keep last 2 years)
2. **Clean up soft-deleted records** (after retention period)
3. **Optimize indexes** (analyze query patterns)
4. **Monitor version history growth** (archive old versions)
5. **Review custom fields** (remove unused fields)

### Monitoring Queries

```sql
-- Check audit log growth
SELECT 
  entity_type,
  COUNT(*) as total_logs,
  COUNT(*) FILTER (WHERE created_at > NOW() - INTERVAL '30 days') as last_30_days
FROM audit_logs
GROUP BY entity_type;

-- Check version history size
SELECT 
  entity_type,
  COUNT(*) as total_versions,
  AVG(pg_column_size(changes)) as avg_size_bytes
FROM version_history
GROUP BY entity_type;

-- Check index usage
SELECT 
  schemaname,
  tablename,
  indexname,
  idx_scan,
  idx_tup_read,
  idx_tup_fetch
FROM pg_stat_user_indexes
WHERE schemaname = 'public'
ORDER BY idx_scan DESC;
```

---

**Last Updated**: 2024
**Schema Version**: 1.0.0
**Prisma Version**: 7.2.0
