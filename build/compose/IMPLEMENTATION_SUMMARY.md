# Domain-Driven Database Architecture - Implementation Summary

## ✅ Completed Tasks

### 1. Prisma Schema Separation ✅
- Created 6 separate Prisma schemas for each domain:
  - `prisma/schemas/identity/schema.prisma` - Identity & Access Management
  - `prisma/schemas/tenant/schema.prisma` - Multi-Tenancy & Configuration
  - `prisma/schemas/organization/schema.prisma` - Organizational Structure
  - `prisma/schemas/job/schema.prisma` - Job Marketplace
  - `prisma/schemas/audit/schema.prisma` - Audit & Compliance
  - `prisma/schemas/workflow/schema.prisma` - Process Management

### 2. Prisma Configuration ✅
- Updated `prisma.config.ts` to support multiple database schemas
- Each schema has its own generator output path and database URL

### 3. Database Clients ✅
- Created separate Prisma clients for each domain:
  - `libs/backend/database/src/clients/identity-client.ts`
  - `libs/backend/database/src/clients/tenant-client.ts`
  - `libs/backend/database/src/clients/organization-client.ts`
  - `libs/backend/database/src/clients/job-client.ts`
  - `libs/backend/database/src/clients/audit-client.ts`
  - `libs/backend/database/src/clients/workflow-client.ts`
- Updated `libs/backend/database/src/clients/index.ts` to export all clients

### 4. Database Manager ✅
- Updated `DatabaseManager` service to handle multiple database clients
- Added convenience methods: `getIdentityClient()`, `getTenantClient()`, etc.
- Updated health check to support multiple domains

### 5. Cross-Database References ✅
- Removed foreign key relations across databases
- Implemented ID-based references with denormalization:
  - `JobApplication.userEmail`, `userName` (denormalized from User)
  - `AuditLog.userEmail` (denormalized from User)
  - `CompanyUser.userEmail`, `userName` (denormalized from User)
  - `Job.companyName`, `companyEmail` (denormalized from Company)
  - `JobSkill.skillName` (denormalized from Skill)
  - `WorkflowInstance.startedByEmail`, `completedByEmail` (denormalized from User)

### 6. Reference Resolver Service ✅
- Created `ReferenceResolverService` for cross-database lookups
- Implements caching (5-minute TTL) for frequently accessed references
- Supports batch lookups for performance
- Methods: `resolveUser()`, `resolveUsers()`, `resolveTenant()`, `resolveCompany()`

### 7. Docker Infrastructure ✅
- Updated `docker-compose.databases.yml` with 6 PostgreSQL instances:
  - `postgres-identity` (port 5433)
  - `postgres-tenant` (port 5434)
  - `postgres-organization` (port 5435)
  - `postgres-job` (port 5436)
  - `postgres-audit` (port 5437)
  - `postgres-workflow` (port 5438)
- Each database has its own PgBouncer instance for connection pooling

### 8. Environment Variables ✅
- Updated service configurations in `docker-compose.yml`:
  - `auth-service` → `IDENTITY_DATABASE_URL`
  - `company-service` → `ORGANIZATION_DATABASE_URL`
  - `job-service` → `JOB_DATABASE_URL`
  - `tenant-service` → `TENANT_DATABASE_URL`
  - `audit-service` → `AUDIT_DATABASE_URL`
- All services now have access to their respective database URLs

### 9. Migration Scripts ✅
- Created `build/scripts/init-databases.sh` - Initialize all domain databases
- Created `build/scripts/migrate-to-domain-databases.sh` - Migrate from single database
- Created `build/scripts/generate-prisma-clients.sh` - Generate Prisma clients for all domains

### 10. Documentation ✅
- Updated `prisma/README.md` with domain-based architecture
- Created `build/compose/DOMAIN_ARCHITECTURE.md` - Detailed architecture documentation
- Updated `package.json` scripts for domain-based operations

## 📋 Next Steps

### 1. Generate Prisma Clients
```bash
npm run prisma:generate
# or
./build/scripts/generate-prisma-clients.sh
```

### 2. Deploy Infrastructure
```bash
docker stack deploy -c build/compose/docker-compose.databases.yml hirenova-infra
```

### 3. Initialize Databases
```bash
./build/scripts/init-databases.sh
```

### 4. Update Application Services
Update each service to use the appropriate domain client:

**auth-service**:
```typescript
import { identityPrisma } from '@hirenova/database/clients';
// Use identityPrisma instead of prisma
```

**company-service**:
```typescript
import { organizationPrisma } from '@hirenova/database/clients';
// Use organizationPrisma for company/vendor operations
// Use identityPrisma for user references
```

**job-service**:
```typescript
import { jobPrisma, identityPrisma, organizationPrisma } from '@hirenova/database/clients';
// Use jobPrisma for job operations
// Use identityPrisma for user references
// Use organizationPrisma for company references
```

### 5. Update Cross-Database Queries
Replace direct relations with ReferenceResolverService:

**Before**:
```typescript
const application = await prisma.jobApplication.findUnique({
  where: { id },
  include: { user: true }
});
```

**After**:
```typescript
const application = await jobPrisma.jobApplication.findUnique({
  where: { id }
});
const user = await referenceResolver.resolveUser(application.userId);
```

### 6. Update Denormalized Fields
Create event handlers to keep denormalized fields in sync:

```typescript
// When User.email changes
await jobPrisma.jobApplication.updateMany({
  where: { userId: user.id },
  data: { userEmail: user.email }
});
```

### 7. Data Migration (if migrating from single database)
```bash
./build/scripts/migrate-to-domain-databases.sh [source-db-url] [backup-dir]
```

## 🔧 Configuration Files

### Environment Variables Required

Add to `.env.docker`:

```env
# Database Names
IDENTITY_DB_NAME=identity_db
TENANT_DB_NAME=tenant_db
ORGANIZATION_DB_NAME=organization_db
JOB_DB_NAME=job_db
AUDIT_DB_NAME=audit_db
WORKFLOW_DB_NAME=workflow_db

# Database URLs
IDENTITY_DATABASE_URL=postgresql://postgres:prisma@postgres-identity:5432/identity_db?schema=public
TENANT_DATABASE_URL=postgresql://postgres:prisma@postgres-tenant:5432/tenant_db?schema=public
ORGANIZATION_DATABASE_URL=postgresql://postgres:prisma@postgres-organization:5432/organization_db?schema=public
JOB_DATABASE_URL=postgresql://postgres:prisma@postgres-job:5432/job_db?schema=public
AUDIT_DATABASE_URL=postgresql://postgres:prisma@postgres-audit:5432/audit_db?schema=public
WORKFLOW_DATABASE_URL=postgresql://postgres:prisma@postgres-workflow:5432/workflow_db?schema=public

# Database Ports
POSTGRES_IDENTITY_PORT=5433
POSTGRES_TENANT_PORT=5434
POSTGRES_ORGANIZATION_PORT=5435
POSTGRES_JOB_PORT=5436
POSTGRES_AUDIT_PORT=5437
POSTGRES_WORKFLOW_PORT=5438

# PgBouncer Ports
PGBOUNCER_IDENTITY_PORT=6433
PGBOUNCER_TENANT_PORT=6434
PGBOUNCER_ORGANIZATION_PORT=6435
PGBOUNCER_JOB_PORT=6436
PGBOUNCER_AUDIT_PORT=6437
PGBOUNCER_WORKFLOW_PORT=6438
```

## 📊 Database Mapping

| Service | Primary Database | Additional Databases Used |
|---------|----------------|-------------------------|
| auth-service | identity_db | tenant_db |
| tenant-service | tenant_db | - |
| company-service | organization_db | identity_db, tenant_db |
| job-service | job_db | identity_db, organization_db, tenant_db |
| audit-service | audit_db | identity_db, tenant_db |
| notification-service | - | RabbitMQ only |
| search-service | - | Redis only |

## ⚠️ Important Notes

1. **Cross-Database Transactions**: Not supported. Use Saga pattern for distributed transactions.

2. **Denormalized Fields**: Must be kept in sync via events or scheduled jobs.

3. **Reference Resolution**: Always use `ReferenceResolverService` for cross-database lookups to benefit from caching.

4. **Migration Order**: Initialize databases in order: identity → tenant → organization → job → audit → workflow

5. **Backward Compatibility**: Legacy `prisma` export still points to `identityPrisma` for gradual migration.

## 🐛 Troubleshooting

### Client Generation Fails
- Ensure all schema files exist
- Check environment variables are set
- Verify Prisma version compatibility

### Migration Fails
- Check database connectivity
- Verify database exists
- Check user permissions

### Cross-Database References Not Working
- Ensure using `ReferenceResolverService`
- Check denormalized fields are populated
- Verify cache is working

## 📚 Additional Resources

- `build/compose/DOMAIN_ARCHITECTURE.md` - Detailed architecture documentation
- `prisma/README.md` - Prisma schema documentation
- `build/compose/DEPLOYMENT.md` - Deployment guide
