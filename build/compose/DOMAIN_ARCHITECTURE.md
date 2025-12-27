# Domain-Driven Database Architecture

## Overview

The database architecture is organized by domain/use-case rather than by service, enabling better normalization, scalability, and maintainability.

## Database Domains

### 1. Identity Database (`identity_db`)
**Port**: 5433  
**Domain**: Identity & Access Management

**Models**:
- `User` - Core user identity
- `SystemRole`, `SystemPermission`, `SystemRolePermission` - System-level RBAC
- `Skill` - Skills catalog (shared)
- `UserSkill`, `Experience`, `Education`, `Resume` - User profile data

**Access Pattern**: Read-heavy, frequent authentication lookups

**Used By**:
- auth-service (primary)
- All services (for user references)

### 2. Tenant Database (`tenant_db`)
**Port**: 5434  
**Domain**: Multi-Tenancy & Configuration

**Models**:
- `Tenant` - Multi-tenant configuration
- `CustomField`, `CustomFieldValue` - Dynamic field system

**Access Pattern**: Read-heavy, infrequent writes

**Used By**:
- tenant-service (primary)
- All services (for tenant context)

### 3. Organization Database (`organization_db`)
**Port**: 5435  
**Domain**: Organizational Structure

**Models**:
- `Company`, `CompanyUser`, `CompanyRole`, `CompanyPermission`, `CompanyRolePermission`
- `Vendor`, `VendorUser`, `VendorRole`, `VendorPermission`, `VendorRolePermission`

**Access Pattern**: Moderate read/write

**Used By**:
- company-service (primary)

### 4. Job Database (`job_db`)
**Port**: 5436  
**Domain**: Job Marketplace

**Models**:
- `Job`, `JobApplication`, `SavedJob`
- `JobSkill` (references Skill.id from identity_db)

**Access Pattern**: High transaction volume, read-heavy

**Used By**:
- job-service (primary)

### 5. Audit Database (`audit_db`)
**Port**: 5437  
**Domain**: Audit & Compliance

**Models**:
- `AuditLog` - Audit trail
- `VersionHistory` - Entity version history

**Access Pattern**: Write-heavy, append-only, compliance queries

**Used By**:
- audit-service (primary)
- All services (for audit logging)

### 6. Workflow Database (`workflow_db`)
**Port**: 5438  
**Domain**: Process Management

**Models**:
- `Workflow`, `WorkflowStep`, `WorkflowInstance`

**Access Pattern**: Moderate read/write, process state management

**Used By**:
- Workflow services (if separate)
- Can be part of tenant-service

## Cross-Database References

### Reference Strategy

Cross-database relationships use ID references instead of foreign keys:

1. **ID References**: Store only the ID (String) of the referenced entity
2. **Denormalization**: Add frequently accessed fields (e.g., `userEmail`, `userName`)
3. **Reference Resolver**: Use `ReferenceResolverService` for lookups with caching
4. **Event-Driven Updates**: Update denormalized fields via events

### Example Patterns

**Before** (Single Database):
```prisma
model JobApplication {
  userId String
  user   User @relation(fields: [userId], references: [id])
}
```

**After** (Cross-Database):
```prisma
model JobApplication {
  userId    String  // Reference to User.id in identity_db
  userEmail String? // Denormalized for quick access
  userName  String? // Denormalized for display
  // No @relation - cross-database reference
}
```

### Common References

- **User References**: Used across all domains
  - Store: `userId: String`
  - Denormalize: `userEmail`, `userName`
  - Resolve: `ReferenceResolverService.resolveUser(userId)`

- **Tenant References**: Used across all domains
  - Store: `tenantId: String`
  - Resolve: `ReferenceResolverService.resolveTenant(tenantId)`

- **Company References**: Used in job domain
  - Store: `companyId: String`
  - Denormalize: `companyName`, `companyEmail`
  - Resolve: `ReferenceResolverService.resolveCompany(companyId)`

## Prisma Schema Structure

```
prisma/
├── schemas/
│   ├── identity/
│   │   └── schema.prisma
│   ├── tenant/
│   │   └── schema.prisma
│   ├── organization/
│   │   └── schema.prisma
│   ├── job/
│   │   └── schema.prisma
│   ├── audit/
│   │   └── schema.prisma
│   └── workflow/
│       └── schema.prisma
└── config/
    └── prisma.config.ts
```

Each schema:
- Has its own generator output path
- Uses its own database URL environment variable
- Contains domain-specific models
- Includes shared enums (copied to each)

## Database Clients

Each domain has its own Prisma client:

```typescript
import { identityPrisma } from '@hirenova/database/clients';
import { tenantPrisma } from '@hirenova/database/clients';
import { organizationPrisma } from '@hirenova/database/clients';
import { jobPrisma } from '@hirenova/database/clients';
import { auditPrisma } from '@hirenova/database/clients';
import { workflowPrisma } from '@hirenova/database/clients';
```

Or use DatabaseManager:

```typescript
const identityClient = databaseManager.getIdentityClient();
const tenantClient = databaseManager.getTenantClient();
```

## Service to Database Mapping

| Service | Primary Database | Additional Databases |
|---------|-----------------|---------------------|
| auth-service | identity_db | tenant_db (for tenant context) |
| tenant-service | tenant_db | - |
| company-service | organization_db | identity_db (for user refs), tenant_db (for tenant) |
| job-service | job_db | identity_db (for user refs), organization_db (for company), tenant_db (for tenant) |
| audit-service | audit_db | identity_db (for user refs), tenant_db (for tenant) |
| notification-service | - | Uses RabbitMQ only |
| search-service | - | Uses Redis only |

## Environment Variables

```env
# Identity Database
IDENTITY_DATABASE_URL=postgresql://postgres:prisma@postgres-identity:5432/identity_db?schema=public

# Tenant Database
TENANT_DATABASE_URL=postgresql://postgres:prisma@postgres-tenant:5432/tenant_db?schema=public

# Organization Database
ORGANIZATION_DATABASE_URL=postgresql://postgres:prisma@postgres-organization:5432/organization_db?schema=public

# Job Database
JOB_DATABASE_URL=postgresql://postgres:prisma@postgres-job:5432/job_db?schema=public

# Audit Database
AUDIT_DATABASE_URL=postgresql://postgres:prisma@postgres-audit:5432/audit_db?schema=public

# Workflow Database
WORKFLOW_DATABASE_URL=postgresql://postgres:prisma@postgres-workflow:5432/workflow_db?schema=public
```

## Migration Process

1. **Deploy Infrastructure**
   ```bash
   docker stack deploy -c build/compose/docker-compose.databases.yml hirenova-infra
   ```

2. **Initialize Databases**
   ```bash
   ./build/scripts/init-databases.sh
   ```

3. **Migrate Data** (if migrating from single database)
   ```bash
   ./build/scripts/migrate-to-domain-databases.sh
   ```

4. **Update Denormalized Fields**
   - Run scripts to populate denormalized fields
   - Set up event handlers for future updates

## Benefits

1. **Normalization**: Each database optimized for its domain
2. **Scalability**: Scale databases independently
3. **Isolation**: Domain failures don't cascade
4. **Performance**: Optimized indexes per domain
5. **Compliance**: Audit data isolated
6. **Maintainability**: Clear domain boundaries

## Best Practices

1. **Always use ReferenceResolverService** for cross-database lookups
2. **Cache frequently accessed references** (User, Tenant)
3. **Update denormalized fields** via events for consistency
4. **Use batch lookups** when resolving multiple references
5. **Monitor cross-database query performance**
6. **Keep denormalized fields in sync** with source data
