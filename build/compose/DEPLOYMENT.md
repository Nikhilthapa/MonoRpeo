# Docker Deployment Guide

## Overview

This guide explains the new organized Docker deployment structure with separate databases per service.

## Architecture

### Database Strategy

Each backend service has its own PostgreSQL database:

- **auth-service** → `auth_db` (User, SystemRole, Skills, Experience, Education, Resume)
- **company-service** → `company_db` (Company, CompanyUser, CompanyRole)
- **job-service** → `job_db` (Job, JobApplication, SavedJob, JobSkill)
- **tenant-service + audit-service** → `tenant_db` (Tenant, AuditLog, CustomField, Workflow, VersionHistory)
- **notification-service** → No database (uses RabbitMQ messaging)
- **search-service** → No database (uses Redis cache/search)

### File Structure

```
build/compose/
├── docker-compose.yml              # Main application services
├── docker-compose.databases.yml    # All database services
├── docker-compose.infrastructure.yml # Redis, RabbitMQ, etc.
└── DEPLOYMENT.md                  # This file

.env.docker                         # Centralized environment file (create from .env.example)
```

## Prerequisites

1. Docker Swarm initialized
2. `.env.docker` file created (copy from `.env.example` and customize)
3. PostgreSQL config files in `build/config/postgres/`
4. PgBouncer config files in `build/config/pgbouncer/`

## Deployment Steps

### 1. Setup Environment

```bash
# Copy example env file
cp .env.example .env.docker

# Edit .env.docker with your configuration
nano .env.docker
```

### 2. Deploy Infrastructure

Deploy databases and infrastructure services first:

```bash
docker stack deploy \
  -c build/compose/docker-compose.databases.yml \
  -c build/compose/docker-compose.infrastructure.yml \
  hirenova-infra
```

Wait for all services to be healthy:

```bash
docker service ls
docker service ps hirenova-infra_postgres-auth
docker service ps hirenova-infra_postgres-company
docker service ps hirenova-infra_postgres-job
docker service ps hirenova-infra_postgres-tenant
```

### 3. Initialize Databases

Run the database initialization script:

```bash
# Initialize all databases
./build/scripts/init-databases.sh

# Or initialize a specific service
./build/scripts/init-databases.sh auth
./build/scripts/init-databases.sh company
./build/scripts/init-databases.sh job
./build/scripts/init-databases.sh tenant
```

### 4. Deploy Application Services

Deploy the main application stack:

```bash
docker stack deploy \
  -c build/compose/docker-compose.yml \
  -c build/compose/docker-compose.databases.yml \
  -c build/compose/docker-compose.infrastructure.yml \
  hirenova
```

### 5. Verify Deployment

Check service status:

```bash
docker service ls
docker stack services hirenova
docker stack ps hirenova
```

Check logs:

```bash
docker service logs hirenova_auth-service
docker service logs hirenova_company-service
docker service logs hirenova_job-service
```

## Service Discovery

All services use Docker service names for communication:

- Databases: `postgres-auth`, `postgres-company`, `postgres-job`, `postgres-tenant`
- Redis: `redis`, `redis-contact-lookup`, `redis-data-scraper`
- RabbitMQ: `rabbitmq`
- Services: `auth-service`, `company-service`, `job-service`, etc.

## Database Connection Strings

Each service uses its dedicated database URL from `.env.docker`:

- Auth Service: `${AUTH_DATABASE_URL}`
- Company Service: `${COMPANY_DATABASE_URL}`
- Job Service: `${JOB_DATABASE_URL}`
- Tenant/Audit Service: `${TENANT_DATABASE_URL}`

## Ports

### Database Ports (External Access)

- Auth DB: `5433`
- Company DB: `5434`
- Job DB: `5435`
- Tenant DB: `5436`

### Service Ports

- API Gateway: `3031`
- Auth Service: `3001`
- Company Service: `3002`
- Job Service: `3003`
- Tenant Service: `3004`
- Audit Service: `3005`
- Search Service: `3006`
- Notification Service: `3038`

## Scaling Services

Scale individual services:

```bash
docker service scale hirenova_job-service=3
docker service scale hirenova_auth-service=2
```

## Updating Services

Update a specific service:

```bash
docker service update --image placio33/sparix:latest hirenova_auth-service
```

Rolling update:

```bash
docker service update --update-parallelism 1 --update-delay 10s hirenova_job-service
```

## Troubleshooting

### Database Connection Issues

1. Check database service is running:
   ```bash
   docker service ps hirenova-infra_postgres-auth
   ```

2. Check database logs:
   ```bash
   docker service logs hirenova-infra_postgres-auth
   ```

3. Test connection:
   ```bash
   docker exec -it $(docker ps -q -f name=postgres-auth) psql -U postgres -d auth_db
   ```

### Service Not Starting

1. Check service logs:
   ```bash
   docker service logs hirenova_auth-service
   ```

2. Check environment variables:
   ```bash
   docker service inspect hirenova_auth-service
   ```

3. Verify dependencies:
   ```bash
   docker service ps hirenova-infra_postgres-auth
   docker service ps hirenova-infra_redis
   docker service ps hirenova-infra_rabbitmq
   ```

### Migration Issues

Run migrations manually:

```bash
# Set DATABASE_URL for the service
export DATABASE_URL="postgresql://postgres:prisma@postgres-auth:5432/auth_db?schema=public"

# Run migrations
npx prisma migrate deploy
```

## Backup & Restore

### Backup Database

```bash
# Backup auth database
docker exec $(docker ps -q -f name=postgres-auth) pg_dump -U postgres auth_db > auth_db_backup.sql

# Backup all databases
for db in auth_db company_db job_db tenant_db; do
  docker exec $(docker ps -q -f name=postgres-${db%_db}) pg_dump -U postgres $db > ${db}_backup.sql
done
```

### Restore Database

```bash
# Restore auth database
docker exec -i $(docker ps -q -f name=postgres-auth) psql -U postgres auth_db < auth_db_backup.sql
```

## Monitoring

### Health Checks

All services include health checks. Monitor health:

```bash
docker service ps hirenova_auth-service --no-trunc
```

### Resource Usage

Check resource usage:

```bash
docker stats
docker service ps hirenova_auth-service --format "table {{.Name}}\t{{.Node}}\t{{.CurrentState}}"
```

## Cleanup

Remove stack:

```bash
docker stack rm hirenova
docker stack rm hirenova-infra
```

Remove volumes (⚠️ **WARNING**: This deletes all data):

```bash
docker volume rm hirenova-infra_postgres-auth-data
docker volume rm hirenova-infra_postgres-company-data
docker volume rm hirenova-infra_postgres-job-data
docker volume rm hirenova-infra_postgres-tenant-data
```

## Migration from Old Structure

If migrating from the old single-database structure:

1. Backup existing database
2. Deploy new infrastructure
3. Restore data to appropriate databases
4. Update application services
5. Verify all services are working
6. Remove old stack

## Support

For issues or questions:
1. Check service logs
2. Review this documentation
3. Check Docker Swarm status
4. Verify environment variables in `.env.docker`
