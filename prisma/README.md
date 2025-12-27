# Domain-Driven Prisma Schema Architecture

This directory contains domain-driven Prisma schemas organized by use-case/domain. Each domain has its own database, enabling better normalization, scalability, and domain isolation.

## Structure

```
prisma/
├── schemas/
│   ├── identity/
│   │   └── schema.prisma      # Identity & Access Management
│   ├── tenant/
│   │   └── schema.prisma      # Multi-Tenancy & Configuration
│   ├── organization/
│   │   └── schema.prisma      # Organizational Structure
│   ├── job/
│   │   └── schema.prisma      # Job Marketplace
│   ├── audit/
│   │   └── schema.prisma      # Audit & Compliance
│   └── workflow/
│       └── schema.prisma      # Process Management
├── migrations/
│   ├── identity/
│   ├── tenant/
│   ├── organization/
│   ├── job/
│   ├── audit/
│   └── workflow/
├── clients/
│   └── index.ts              # Client exports
└── config/
    └── prisma.config.ts      # Multi-database configuration
```

## Domain Organization

### Identity Domain (`identity_db`)
**Port**: 5433  
**Schema**: `prisma/schemas/identity/schema.prisma`

- **User** - Core user identity
- **SystemRole**, **SystemPermission** - System-level RBAC
- **Skill** - Skills catalog
- **UserSkill**, **Experience**, **Education**, **Resume** - User profile data

### Tenant Domain (`tenant_db`)
**Port**: 5434  
**Schema**: `prisma/schemas/tenant/schema.prisma`

- **Tenant** - Multi-tenant configuration
- **CustomField**, **CustomFieldValue** - Dynamic field system

### Organization Domain (`organization_db`)
**Port**: 5435  
**Schema**: `prisma/schemas/organization/schema.prisma`

- **Company**, **CompanyUser**, **CompanyRole**, **CompanyPermission**
- **Vendor**, **VendorUser**, **VendorRole**, **VendorPermission**

### Job Domain (`job_db`)
**Port**: 5436  
**Schema**: `prisma/schemas/job/schema.prisma`

- **Job**, **JobApplication**, **SavedJob**
- **JobSkill** (references Skill.id from identity_db)

### Audit Domain (`audit_db`)
**Port**: 5437  
**Schema**: `prisma/schemas/audit/schema.prisma`

- **AuditLog** - Audit trail
- **VersionHistory** - Entity version history

### Workflow Domain (`workflow_db`)
**Port**: 5438  
**Schema**: `prisma/schemas/workflow/schema.prisma`

- **Workflow**, **WorkflowStep**, **WorkflowInstance**

## Setup

### 1. Environment Variables

Create a `.env.docker` file with database URLs for each domain:

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

### 2. Generate Prisma Clients

Generate clients for all domains:

```bash
./build/scripts/generate-prisma-clients.sh
```

Or generate for a specific domain:

```bash
./build/scripts/generate-prisma-clients.sh identity
```

### 3. Run Migrations

Initialize all databases:

```bash
./build/scripts/init-databases.sh
```

Or initialize a specific domain:

```bash
./build/scripts/init-databases.sh identity
```

Run migrations for a specific domain:

```bash
npx prisma migrate deploy --schema=prisma/schemas/identity/schema.prisma
```

### 4. Seed Databases

Seed scripts should be updated to work with domain-specific databases.

## Usage in Code

### Import Domain Clients

```typescript
import {
  identityPrisma,
  tenantPrisma,
  organizationPrisma,
  jobPrisma,
  auditPrisma,
  workflowPrisma,
} from '@hirenova/database/clients';

// Use domain-specific clients
const user = await identityPrisma.user.findUnique({ where: { id } });
const tenant = await tenantPrisma.tenant.findUnique({ where: { id } });
const company = await organizationPrisma.company.findUnique({ where: { id } });
const job = await jobPrisma.job.findUnique({ where: { id } });
```

### Using DatabaseManager

```typescript
import { DatabaseManager } from '@hirenova/database';

// Get client by domain
const identityClient = databaseManager.getIdentityClient();
const tenantClient = databaseManager.getTenantClient();
```

### Cross-Database References

For cross-database references, use ReferenceResolverService:

```typescript
import { ReferenceResolverService } from '@hirenova/database';

// Resolve user reference
const user = await referenceResolver.resolveUser(userId);

// Resolve multiple users (batch lookup)
const users = await referenceResolver.resolveUsers([userId1, userId2]);

// Get denormalized fields
const userEmail = await referenceResolver.getUserEmail(userId);
const userName = await referenceResolver.getUserName(userId);
```

## Cross-Database Reference Patterns

### ID References

Models store only IDs for cross-database references:

```prisma
model JobApplication {
  userId    String  // Reference to User.id in identity_db
  userEmail String? // Denormalized for quick access
  userName  String? // Denormalized for display
}
```

### Denormalization

Frequently accessed fields are denormalized:

- `JobApplication.userEmail` - From User.email
- `AuditLog.userEmail` - From User.email
- `CompanyUser.userEmail` - From User.email
- `Job.companyName` - From Company.name

### Event-Driven Updates

Denormalized fields are updated via events for eventual consistency.

## Migration Commands

### Generate Clients

```bash
# All domains
./build/scripts/generate-prisma-clients.sh

# Specific domain
./build/scripts/generate-prisma-clients.sh identity
```

### Run Migrations

```bash
# All domains
./build/scripts/init-databases.sh

# Specific domain
./build/scripts/init-databases.sh identity

# Manual migration
npx prisma migrate deploy --schema=prisma/schemas/identity/schema.prisma
```

### Create Migration

```bash
npx prisma migrate dev --schema=prisma/schemas/identity/schema.prisma --name add_user_field
```

## Benefits

1. **Normalization**: Each database optimized for its domain
2. **Scalability**: Scale databases independently based on load
3. **Isolation**: Domain failures don't cascade
4. **Performance**: Optimized indexes and queries per domain
5. **Compliance**: Audit data isolated and secure
6. **Maintainability**: Clear domain boundaries

## Migration from Single Database

If migrating from a single database:

1. Backup existing database
2. Run migration script: `./build/scripts/migrate-to-domain-databases.sh`
3. Update denormalized fields
4. Verify data integrity
5. Deploy new structure

See `build/compose/DOMAIN_ARCHITECTURE.md` for detailed architecture documentation.
