# ERP Schema Setup & Migration Guide

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Initial Setup](#initial-setup)
3. [Database Migration](#database-migration)
4. [Seed Data](#seed-data)
5. [Post-Migration Tasks](#post-migration-tasks)
6. [Troubleshooting](#troubleshooting)

## Prerequisites

### Required Software

- Node.js 18+ and npm/yarn
- PostgreSQL 14+ database
- Prisma CLI 7.2.0+

### Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/hirenova?schema=public"

# Application (optional)
NODE_ENV=development
```

### Verify Prisma Installation

```bash
npm list prisma @prisma/client
# Should show:
# ├── @prisma/client@7.2.0
# └── prisma@7.2.0
```

## Initial Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Generate Prisma Client

```bash
npm run prisma:generate
```

This generates the Prisma Client based on your schema.

### 3. Verify Schema

```bash
npx prisma validate --schema=prisma/schema.prisma
```

Expected output:
```
The schema at prisma/schema.prisma is valid 🚀
```

## Database Migration

### Option 1: Fresh Database (Development)

For a new database or when you can reset:

```bash
# Create and apply migration
npm run prisma:migrate dev --name init_erp_schema

# This will:
# 1. Create migration files in prisma/migrations/
# 2. Apply migration to database
# 3. Generate Prisma Client
```

### Option 2: Existing Database (Production)

For production databases with existing data:

```bash
# 1. Create migration without applying
npx prisma migrate dev --create-only --name init_erp_schema

# 2. Review migration file in prisma/migrations/
# 3. Apply migration
npm run prisma:migrate deploy
```

### Option 3: Database Push (Development Only)

For rapid prototyping (not recommended for production):

```bash
npx prisma db push
```

**Warning**: `db push` does not create migration files and may cause data loss.

### Migration Steps Breakdown

1. **Create Migration**
   ```bash
   npx prisma migrate dev --name add_erp_features
   ```

2. **Review Migration File**
   Check `prisma/migrations/[timestamp]_add_erp_features/migration.sql`

3. **Apply Migration**
   ```bash
   npx prisma migrate deploy
   ```

4. **Verify Migration**
   ```bash
   npx prisma migrate status
   ```

## Seed Data

### Create Seed Script

Update `prisma/seed.ts`:

```typescript
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // 1. Create default tenant
  const tenant = await prisma.tenant.upsert({
    where: { slug: 'default' },
    update: {},
    create: {
      name: 'Default Tenant',
      slug: 'default',
      email: 'admin@hirenova.com',
      subscriptionPlan: 'enterprise',
      subscriptionStatus: 'active',
      maxUsers: 1000,
      maxJobs: 10000,
      isActive: true,
      isVerified: true,
      settings: {},
      features: {
        workflows: true,
        customFields: true,
        auditLogs: true
      }
    }
  });

  console.log('✅ Created tenant:', tenant.name);

  // 2. Create system permissions
  const systemPermissions = [
    { name: 'user.create', description: 'Create users', scope: 'SYSTEM' },
    { name: 'user.read', description: 'Read users', scope: 'SYSTEM' },
    { name: 'user.update', description: 'Update users', scope: 'SYSTEM' },
    { name: 'user.delete', description: 'Delete users', scope: 'SYSTEM' },
    { name: 'job.create', description: 'Create jobs', scope: 'SYSTEM' },
    { name: 'job.read', description: 'Read jobs', scope: 'SYSTEM' },
    { name: 'job.update', description: 'Update jobs', scope: 'SYSTEM' },
    { name: 'job.delete', description: 'Delete jobs', scope: 'SYSTEM' },
  ];

  for (const perm of systemPermissions) {
    await prisma.systemPermission.upsert({
      where: { name: perm.name },
      update: {},
      create: perm
    });
  }

  console.log('✅ Created system permissions');

  // 3. Create Super Admin role
  const superAdminRole = await prisma.systemRole.upsert({
    where: { name: 'Super Admin' },
    update: {},
    create: {
      name: 'Super Admin',
      description: 'Full system access',
      version: 1
    }
  });

  // Assign all permissions to Super Admin
  const allPermissions = await prisma.systemPermission.findMany();
  for (const perm of allPermissions) {
    await prisma.systemRolePermission.upsert({
      where: {
        roleId_permissionId: {
          roleId: superAdminRole.id,
          permissionId: perm.id
        }
      },
      update: {},
      create: {
        roleId: superAdminRole.id,
        permissionId: perm.id
      }
    });
  }

  console.log('✅ Created Super Admin role');

  // 4. Create Super Admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const superAdmin = await prisma.user.upsert({
    where: { email: 'admin@hirenova.com' },
    update: {},
    create: {
      tenantId: tenant.id,
      email: 'admin@hirenova.com',
      password: hashedPassword,
      firstName: 'Super',
      lastName: 'Admin',
      emailVerified: true,
      isActive: true,
      systemRoleId: superAdminRole.id,
      version: 1
    }
  });

  console.log('✅ Created Super Admin user');
  console.log('   Email: admin@hirenova.com');
  console.log('   Password: admin123');
  console.log('   ⚠️  Change password after first login!');

  // 5. Create sample skills
  const skills = [
    'JavaScript',
    'TypeScript',
    'React',
    'Node.js',
    'PostgreSQL',
    'Prisma',
    'Next.js',
    'Python',
    'Java',
    'Go'
  ];

  for (const skillName of skills) {
    await prisma.skill.upsert({
      where: { name: skillName },
      update: {},
      create: { name: skillName }
    });
  }

  console.log('✅ Created sample skills');

  // 6. Create default job approval workflow
  const workflow = await prisma.workflow.upsert({
    where: {
      tenantId_entityType_name: {
        tenantId: tenant.id,
        entityType: 'Job',
        name: 'Default Job Approval'
      }
    },
    update: {},
    create: {
      tenantId: tenant.id,
      name: 'Default Job Approval',
      entityType: 'Job',
      isActive: true,
      isDefault: true,
      steps: {
        create: [
          {
            stepOrder: 1,
            name: 'HR Review',
            isRequired: true,
            canSkip: false
          },
          {
            stepOrder: 2,
            name: 'Manager Approval',
            isRequired: true,
            canSkip: false
          }
        ]
      }
    }
  });

  console.log('✅ Created default workflow');

  console.log('\n🎉 Seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

### Run Seed Script

```bash
npm run prisma:seed
```

Or manually:

```bash
npx tsx prisma/seed.ts
```

## Post-Migration Tasks

### 1. Create Partial Indexes (PostgreSQL)

Add these indexes for better performance:

```sql
-- Active jobs index
CREATE INDEX CONCURRENTLY idx_jobs_active 
ON jobs(tenant_id, status) 
WHERE deleted_at IS NULL AND archived_at IS NULL;

-- Active users index
CREATE INDEX CONCURRENTLY idx_users_active 
ON users(tenant_id, is_active) 
WHERE deleted_at IS NULL AND is_active = true;

-- Recent audit logs index
CREATE INDEX CONCURRENTLY idx_audit_logs_recent 
ON audit_logs(tenant_id, created_at DESC) 
WHERE created_at > NOW() - INTERVAL '90 days';
```

### 2. Set Up Middleware for Audit Logs

Create `src/middleware/audit.ts`:

```typescript
import { PrismaClient } from '@prisma/client';

export function createAuditMiddleware(prisma: PrismaClient) {
  prisma.$use(async (params, next) => {
    const result = await next(params);
    
    // Only audit CREATE, UPDATE, DELETE
    if (['create', 'update', 'delete'].includes(params.action)) {
      // Skip audit log creation itself
      if (params.model === 'AuditLog') {
        return result;
      }
      
      try {
        await prisma.auditLog.create({
          data: {
            tenantId: params.args.data?.tenantId,
            entityType: params.model || 'Unknown',
            entityId: result.id || params.args.where?.id,
            action: params.action.toUpperCase(),
            changes: params.args.data,
            userId: params.args.data?.updatedBy || params.args.data?.createdBy,
            metadata: {
              model: params.model,
              action: params.action
            }
          }
        });
      } catch (error) {
        // Don't fail the main operation if audit fails
        console.error('Audit log creation failed:', error);
      }
    }
    
    return result;
  });
}
```

### 3. Create Tenant Context Middleware

Create `src/middleware/tenant.ts`:

```typescript
import { Request, Response, NextFunction } from 'express';

export interface TenantRequest extends Request {
  tenantId?: string;
  userId?: string;
}

export function tenantMiddleware(
  req: TenantRequest,
  res: Response,
  next: NextFunction
) {
  // Extract tenant from various sources
  const tenantId = 
    req.headers['x-tenant-id'] ||
    req.headers['x-tenant-slug'] ||
    req.subdomains?.[0] ||
    req.query.tenantId;
  
  if (!tenantId) {
    return res.status(400).json({ error: 'Tenant ID required' });
  }
  
  req.tenantId = tenantId as string;
  next();
}
```

### 4. Configure Connection Pooling

Update `prisma/clients/index.ts`:

```typescript
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    datasources: {
      db: {
        url: process.env.DATABASE_URL
      }
    }
  });

// Connection pool configuration in DATABASE_URL:
// postgresql://user:password@host:5432/db?connection_limit=10&pool_timeout=20

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export type PrismaClientType = PrismaClient;
```

### 5. Verify Setup

Run verification script:

```typescript
// scripts/verify-setup.ts
import { prisma } from '../prisma/clients';

async function verifySetup() {
  console.log('🔍 Verifying database setup...');
  
  try {
    // Check tenant
    const tenantCount = await prisma.tenant.count();
    console.log(`✅ Tenants: ${tenantCount}`);
    
    // Check users
    const userCount = await prisma.user.count();
    console.log(`✅ Users: ${userCount}`);
    
    // Check indexes
    const indexes = await prisma.$queryRaw`
      SELECT indexname 
      FROM pg_indexes 
      WHERE schemaname = 'public' 
      AND tablename IN ('users', 'jobs', 'companies', 'audit_logs')
    `;
    console.log(`✅ Indexes: ${indexes.length} found`);
    
    // Test query performance
    const start = Date.now();
    await prisma.job.findMany({
      where: { deletedAt: null },
      take: 10
    });
    const duration = Date.now() - start;
    console.log(`✅ Query performance: ${duration}ms`);
    
    console.log('\n🎉 Setup verification complete!');
  } catch (error) {
    console.error('❌ Verification failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

verifySetup();
```

## Troubleshooting

### Migration Issues

**Problem**: Migration fails with "relation already exists"

```bash
# Solution: Reset database (development only!)
npx prisma migrate reset

# Or manually drop and recreate
npx prisma migrate dev --name reset
```

**Problem**: Foreign key constraint errors

```bash
# Check for orphaned records
npx prisma studio

# Or query directly
psql -d hirenova -c "SELECT * FROM users WHERE tenant_id NOT IN (SELECT id FROM tenants);"
```

### Performance Issues

**Problem**: Slow queries

1. Check indexes:
   ```sql
   EXPLAIN ANALYZE SELECT * FROM jobs WHERE tenant_id = 'xxx' AND status = 'PUBLISHED';
   ```

2. Add missing indexes:
   ```sql
   CREATE INDEX CONCURRENTLY idx_jobs_tenant_status ON jobs(tenant_id, status);
   ```

3. Analyze table:
   ```sql
   ANALYZE jobs;
   ```

### Audit Log Growth

**Problem**: Audit logs table growing too large

```sql
-- Archive old audit logs (older than 1 year)
CREATE TABLE audit_logs_archive (LIKE audit_logs INCLUDING ALL);

INSERT INTO audit_logs_archive 
SELECT * FROM audit_logs 
WHERE created_at < NOW() - INTERVAL '1 year';

DELETE FROM audit_logs 
WHERE created_at < NOW() - INTERVAL '1 year';

-- Create partition for future logs (PostgreSQL 10+)
CREATE TABLE audit_logs_partitioned (
  LIKE audit_logs INCLUDING ALL
) PARTITION BY RANGE (created_at);
```

### Version History Growth

**Problem**: Version history consuming too much space

```typescript
// Keep only last N versions per entity
async function cleanupVersionHistory(entityType: string, keepVersions: number = 10) {
  const entities = await prisma.$queryRaw`
    SELECT DISTINCT entity_id 
    FROM version_history 
    WHERE entity_type = ${entityType}
  `;
  
  for (const entity of entities) {
    const versions = await prisma.versionHistory.findMany({
      where: {
        entityType,
        entityId: entity.entity_id
      },
      orderBy: { version: 'desc' },
      skip: keepVersions
    });
    
    await prisma.versionHistory.deleteMany({
      where: {
        id: { in: versions.map(v => v.id) }
      }
    });
  }
}
```

## Checklist

### Pre-Migration

- [ ] Backup existing database
- [ ] Review schema changes
- [ ] Test migration on staging environment
- [ ] Verify environment variables
- [ ] Check Prisma version compatibility

### Migration

- [ ] Run migration command
- [ ] Verify migration status
- [ ] Check for errors in migration logs
- [ ] Verify all tables created
- [ ] Check indexes created

### Post-Migration

- [ ] Run seed script
- [ ] Verify seed data
- [ ] Create partial indexes
- [ ] Set up audit middleware
- [ ] Configure connection pooling
- [ ] Test queries with tenant isolation
- [ ] Monitor performance
- [ ] Set up monitoring/alerts

### Production Deployment

- [ ] Run migration during maintenance window
- [ ] Monitor migration progress
- [ ] Verify data integrity
- [ ] Test application functionality
- [ ] Monitor error logs
- [ ] Check query performance
- [ ] Set up backup schedule
- [ ] Document rollback procedure

---

**Setup Guide Version**: 1.0.0
