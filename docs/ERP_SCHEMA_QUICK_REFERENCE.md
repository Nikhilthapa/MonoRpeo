# ERP Schema Quick Reference Guide

## Quick Links

- [Model Relationships](#model-relationships)
- [Common Queries](#common-queries)
- [Index Reference](#index-reference)
- [Field Types](#field-types)
- [Enums](#enums)

## Model Relationships

### Core ERP Models

```
Tenant
├── users (User[])
├── companies (Company[])
├── vendors (Vendor[])
├── jobs (Job[])
├── customFields (CustomField[])
└── workflows (Workflow[])

User
├── tenant (Tenant)
├── systemRole (SystemRole)
├── companyUsers (CompanyUser[])
├── vendorUsers (VendorUser[])
├── jobApplications (JobApplication[])
├── auditLogs (AuditLog[])
└── versionHistory (VersionHistory[])

Job
├── tenant (Tenant)
├── company (Company)
├── applications (JobApplication[])
├── savedByUsers (SavedJob[])
└── requiredSkills (JobSkill[])

Company
├── tenant (Tenant)
├── companyUsers (CompanyUser[])
├── companyRoles (CompanyRole[])
└── jobs (Job[])

Vendor
├── tenant (Tenant)
├── vendorUsers (VendorUser[])
└── vendorRoles (VendorRole[])
```

### ERP System Models

```
Workflow
├── tenant (Tenant)
├── steps (WorkflowStep[])
└── instances (WorkflowInstance[])

WorkflowInstance
├── workflow (Workflow)
├── currentStep (WorkflowStep)
├── starter (User)
└── completer (User)

CustomField
├── tenant (Tenant)
└── values (CustomFieldValue[])

CustomFieldValue
└── customField (CustomField)

VersionHistory
└── user (User)

AuditLog
├── tenant (Tenant)
└── user (User)
```

## Common Queries

### Multi-Tenant Queries

```typescript
// Get all active jobs for tenant
prisma.job.findMany({
  where: {
    tenantId: tenantId,
    deletedAt: null,
    archivedAt: null
  }
})

// Get user with tenant check
prisma.user.findFirst({
  where: {
    tenantId: tenantId,
    email: email,
    deletedAt: null
  }
})
```

### Audit Queries

```typescript
// Get audit history for entity
prisma.auditLog.findMany({
  where: {
    entityType: 'Job',
    entityId: jobId,
    tenantId: tenantId
  },
  orderBy: { createdAt: 'desc' }
})

// Get user actions
prisma.auditLog.findMany({
  where: {
    userId: userId,
    tenantId: tenantId,
    createdAt: { gte: startDate }
  }
})
```

### Workflow Queries

```typescript
// Get active workflows for entity type
prisma.workflow.findMany({
  where: {
    tenantId: tenantId,
    entityType: 'Job',
    isActive: true
  },
  include: { steps: true }
})

// Get workflow instance for entity
prisma.workflowInstance.findUnique({
  where: {
    entityType_entityId: {
      entityType: 'Job',
      entityId: jobId
    }
  },
  include: {
    workflow: { include: { steps: true } },
    currentStep: true
  }
})
```

### Custom Fields

```typescript
// Get custom fields for entity type
prisma.customField.findMany({
  where: {
    tenantId: tenantId,
    entityType: 'Job',
    isVisible: true
  },
  orderBy: { displayOrder: 'asc' }
})

// Get custom field values for entity
prisma.customFieldValue.findMany({
  where: {
    entityType: 'Job',
    entityId: jobId
  },
  include: { customField: true }
})
```

### Version History

```typescript
// Get version history
prisma.versionHistory.findMany({
  where: {
    entityType: 'Job',
    entityId: jobId
  },
  orderBy: { version: 'desc' }
})

// Get specific version
prisma.versionHistory.findUnique({
  where: {
    entityType_entityId_version: {
      entityType: 'Job',
      entityId: jobId,
      version: versionNumber
    }
  }
})
```

## Index Reference

### Composite Indexes (Most Important)

```prisma
// User
@@index([tenantId, isActive, deletedAt])
@@unique([tenantId, email])

// Job
@@index([tenantId, companyId, status])
@@index([tenantId, status, deletedAt])
@@index([companyId, status])
@@index([status, deletedAt])

// Company
@@index([tenantId, isActive, deletedAt])
@@unique([tenantId, email])

// Vendor
@@index([tenantId, isActive, deletedAt])
@@unique([tenantId, email])

// JobApplication
@@index([jobId, status])
@@index([userId, status])

// CompanyUser
@@index([companyId, isActive, deletedAt])

// AuditLog
@@index([entityType, entityId])
@@index([tenantId, createdAt])
@@index([userId, createdAt])
@@index([action, createdAt])

// WorkflowInstance
@@index([workflowId, status])
@@index([entityType, entityId])
@@index([status, createdAt])

// VersionHistory
@@index([entityType, entityId])
@@index([entityType, entityId, version])
```

## Field Types

### Standard Fields (All Models)

```typescript
// Identification
id: string              // CUID
tenantId?: string       // Multi-tenancy

// Audit
createdBy?: string      // User ID
updatedBy?: string      // User ID
version: number         // Optimistic locking

// Timestamps
createdAt: DateTime
updatedAt: DateTime
deletedAt?: DateTime    // Soft delete
archivedAt?: DateTime   // Archive

// Extensibility
metadata?: Json         // Custom JSON data
```

### Status Fields

```typescript
// User
emailVerified: boolean
isActive: boolean

// Job
status: JobStatus       // DRAFT, PUBLISHED, CLOSED, PAUSED

// JobApplication
status: ApplicationStatus // PENDING, REVIEWING, etc.

// Company/Vendor
isVerified: boolean
isActive: boolean

// WorkflowInstance
status: WorkflowStatus  // PENDING, IN_PROGRESS, APPROVED, etc.
```

## Enums

### AuditAction
```typescript
CREATE | UPDATE | DELETE | VIEW | APPROVE | REJECT | PUBLISH | ARCHIVE
```

### WorkflowStatus
```typescript
PENDING | IN_PROGRESS | APPROVED | REJECTED | CANCELLED
```

### CustomFieldType
```typescript
TEXT | NUMBER | DATE | BOOLEAN | SELECT | MULTI_SELECT | JSON
```

### JobStatus
```typescript
DRAFT | PUBLISHED | CLOSED | PAUSED
```

### ApplicationStatus
```typescript
PENDING | REVIEWING | SHORTLISTED | INTERVIEW_SCHEDULED | 
OFFERED | ACCEPTED | REJECTED | WITHDRAWN
```

### PermissionScope
```typescript
SYSTEM | COMPANY | VENDOR
```

## Common Patterns

### Create with Audit Trail

```typescript
const result = await prisma.$transaction(async (tx) => {
  const entity = await tx.model.create({ data });
  await tx.auditLog.create({
    data: {
      entityType: 'Model',
      entityId: entity.id,
      action: 'CREATE',
      changes: { after: entity },
      userId: currentUserId
    }
  });
  return entity;
});
```

### Update with Optimistic Locking

```typescript
const updated = await prisma.model.update({
  where: {
    id: id,
    version: currentVersion
  },
  data: {
    ...updates,
    version: { increment: 1 },
    updatedBy: currentUserId
  }
});
```

### Soft Delete

```typescript
await prisma.model.update({
  where: { id },
  data: {
    deletedAt: new Date(),
    updatedBy: currentUserId,
    version: { increment: 1 }
  }
});
```

### Archive

```typescript
await prisma.model.update({
  where: { id },
  data: {
    archivedAt: new Date(),
    updatedBy: currentUserId,
    version: { increment: 1 }
  }
});
```

## Performance Tips

1. **Always include tenantId** in WHERE clauses
2. **Use composite indexes** for multi-column filters
3. **Filter deletedAt IS NULL** early
4. **Use select** to limit returned fields
5. **Paginate** large result sets
6. **Use transactions** for related operations
7. **Cache** frequently accessed data (custom fields, workflows)

## Error Handling

### Optimistic Locking Error

```typescript
try {
  await prisma.model.update({
    where: { id, version: currentVersion },
    data: { ... }
  });
} catch (error) {
  if (error.code === 'P2025') {
    // Record was modified
    throw new ConflictError('Record was modified');
  }
}
```

### Unique Constraint Error

```typescript
try {
  await prisma.model.create({ data });
} catch (error) {
  if (error.code === 'P2002') {
    // Unique constraint violation
    throw new ConflictError('Record already exists');
  }
}
```

---

**Quick Reference Version**: 1.0.0
