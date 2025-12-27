# Migration Notes - Docker Deployment Reorganization

## What Changed

### New Structure

1. **Separate Databases per Service**
   - Each backend service now has its own PostgreSQL database
   - Databases: `auth_db`, `company_db`, `job_db`, `tenant_db`
   - Improved isolation, scalability, and security

2. **Organized Docker Compose Files**
   - `docker-compose.yml` - Main application services
   - `docker-compose.databases.yml` - All database services
   - `docker-compose.infrastructure.yml` - Redis and RabbitMQ

3. **Service Discovery**
   - Replaced hardcoded IPs (`216.250.124.34`) with Docker service names
   - Services communicate via Docker DNS (e.g., `postgres-auth`, `rabbitmq`)

4. **Centralized Environment Configuration**
   - All environment variables in `.env.docker`
   - Clear sections and documentation
   - Easy to customize per environment

## Files Created

### New Files

1. `build/compose/docker-compose.databases.yml`
   - PostgreSQL databases for each service
   - PgBouncer connection poolers
   - Health checks and resource limits

2. `build/compose/docker-compose.infrastructure.yml`
   - Redis instances (main, contact-lookup, data-scraper)
   - RabbitMQ message queue
   - Organized infrastructure services

3. `build/scripts/init-databases.sh`
   - Database initialization script
   - Waits for databases to be ready
   - Runs Prisma migrations

4. `build/compose/DEPLOYMENT.md`
   - Complete deployment guide
   - Troubleshooting tips
   - Backup/restore procedures

5. `.env.example`
   - Example environment file with documentation
   - Copy to `.env.docker` and customize

### Modified Files

1. `build/compose/docker-compose.yml`
   - Reorganized services by category
   - Added backend services (auth, company, job, tenant, audit, notification, search)
   - Updated to use new database URLs
   - Removed hardcoded IPs

2. `docker-compose.db.yml`
   - Updated to reference new structure
   - Deprecated in favor of separate files

## Required Configuration Files

The following config files are referenced but need to exist:

1. `build/config/postgres/postgresql.conf` - PostgreSQL configuration
2. `build/config/postgres/pg_hba.conf` - PostgreSQL host-based authentication
3. `build/config/pgbouncer/pgbouncer.ini` - PgBouncer configuration
4. `build/config/pgbouncer/userlist.txt` - PgBouncer user list
5. `build/config/rabbitmq/rabbitmq.conf` - RabbitMQ configuration
6. `build/config/rabbitmq/enabled_plugins` - RabbitMQ plugins

## Environment File Setup

**IMPORTANT**: The `.env.docker` file is gitignored. You need to create it:

```bash
# Copy the example file
cp .env.example .env.docker

# Edit with your values
nano .env.docker
```

## Deployment Order

1. **Infrastructure First**
   ```bash
   docker stack deploy -c build/compose/docker-compose.databases.yml -c build/compose/docker-compose.infrastructure.yml hirenova-infra
   ```

2. **Initialize Databases**
   ```bash
   ./build/scripts/init-databases.sh
   ```

3. **Deploy Application**
   ```bash
   docker stack deploy -c build/compose/docker-compose.yml -c build/compose/docker-compose.databases.yml -c build/compose/docker-compose.infrastructure.yml hirenova
   ```

## Database URLs

Services now use dedicated database URLs:

- Auth: `postgresql://postgres:prisma@postgres-auth:5432/auth_db?schema=public`
- Company: `postgresql://postgres:prisma@postgres-company:5432/company_db?schema=public`
- Job: `postgresql://postgres:prisma@postgres-job:5432/job_db?schema=public`
- Tenant/Audit: `postgresql://postgres:prisma@postgres-tenant:5432/tenant_db?schema=public`

## Backward Compatibility

- Legacy `DATABASE_URL` still supported (points to job_db)
- Old services can be migrated gradually
- Both old and new structures can coexist during migration

## Next Steps

1. Create `.env.docker` from `.env.example`
2. Ensure config files exist in `build/config/`
3. Deploy infrastructure services
4. Initialize databases
5. Deploy application services
6. Test and verify
7. Migrate data if needed

## Support

See `DEPLOYMENT.md` for detailed deployment instructions and troubleshooting.
