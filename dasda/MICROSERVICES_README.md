# Microservices Architecture Implementation

This document describes the microservices architecture implementation for the HireNova platform.

## Architecture Overview

The application has been decomposed into multiple microservices:

- **API Gateway** (Port 3000) - Entry point for all client requests
- **Auth Service** (Port 3001) - User authentication and profile management
- **Tenant Service** (Port 3002) - Multi-tenancy and custom fields
- **Job Service** (Port 3003) - Job postings and applications
- **Company Service** (Port 3004) - Company management
- **Audit Service** (Port 3005) - Event-driven audit logging

## Shared Libraries

### `libs/shared/types`
Shared TypeScript types for tenant context, auth, and common types.

### `libs/shared/events`
Event definitions for domain events (user.created, job.created, etc.)

### `libs/shared/contracts`
Service contracts defining API interfaces between services.

### `libs/shared/utils`
Shared utilities for tenant context extraction and error handling.

### `libs/backend/messaging`
Event bus abstraction layer for asynchronous communication between services.

## Service Structure

Each service follows a consistent structure:

```
apps/{service-name}/
├── src/
│   ├── main.ts              # Application entry point
│   ├── app.module.ts        # Root NestJS module
│   ├── {domain}/            # Domain modules (auth, job, etc.)
│   │   ├── {domain}.controller.ts
│   │   ├── {domain}.service.ts
│   │   └── dto/            # Data transfer objects
│   └── prisma/
│       └── prisma.service.ts
├── prisma/
│   └── schema.prisma        # Service-specific Prisma schema
└── package.json
```

## Database Strategy

**Current Approach**: Shared database with service boundaries
- All services use the same PostgreSQL database
- Each service has its own Prisma schema (subset of models)
- Services communicate via APIs, not direct database access
- Migration path: Later split into database-per-service

## Communication Patterns

### Synchronous (HTTP/REST)
- Request/response for immediate needs
- Used for: Auth validation, tenant checks, user lookups

### Asynchronous (Event-Driven)
- Event bus for async operations
- Used for: Audit logs, notifications, search indexing
- Events: `user.created`, `job.created`, `application.created`, etc.

## Tenant Context Propagation

1. API Gateway extracts tenant from:
   - `x-tenant-id` header
   - Subdomain (e.g., `tenant1.example.com`)
   - JWT token payload

2. Gateway adds `x-tenant-id` header to all downstream requests

3. Each service validates tenant exists and scopes queries to tenant

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
# Create .env files for each service
# Example: apps/api-gateway/.env
DATABASE_URL="postgresql://user:password@localhost:5432/hirenova"
PORT=3000
AUTH_SERVICE_URL=http://localhost:3001
TENANT_SERVICE_URL=http://localhost:3002
JOB_SERVICE_URL=http://localhost:3003
COMPANY_SERVICE_URL=http://localhost:3004
AUDIT_SERVICE_URL=http://localhost:3005
```

3. Generate Prisma clients for each service:
```bash
cd apps/auth-service && npm run prisma:generate
cd apps/tenant-service && npm run prisma:generate
cd apps/job-service && npm run prisma:generate
cd apps/company-service && npm run prisma:generate
cd apps/audit-service && npm run prisma:generate
```

4. Run database migrations:
```bash
npm run prisma:migrate
```

### Running Services

**Development Mode** (run each service separately):

```bash
# Terminal 1 - API Gateway
npm run dev:api-gateway

# Terminal 2 - Auth Service
npm run dev:auth-service

# Terminal 3 - Tenant Service
npm run dev:tenant-service

# Terminal 4 - Job Service
npm run dev:job-service

# Terminal 5 - Company Service
npm run dev:company-service

# Terminal 6 - Audit Service
npm run dev:audit-service

# Terminal 7 - Frontend
npm run dev:home-web
```

## API Endpoints

### API Gateway Routes
All requests go through the gateway at `http://localhost:3000/api/*`

- `/api/auth/*` → Auth Service
- `/api/tenants/*` → Tenant Service
- `/api/jobs/*` → Job Service
- `/api/companies/*` → Company Service
- `/api/audit/*` → Audit Service

### Example Requests

```bash
# Register user
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -H "x-tenant-id: tenant-123" \
  -d '{"email":"user@example.com","password":"password123"}'

# Create job
curl -X POST http://localhost:3000/api/jobs \
  -H "Content-Type: application/json" \
  -H "x-tenant-id: tenant-123" \
  -H "Authorization: Bearer <token>" \
  -d '{"companyId":"company-123","title":"Software Engineer"}'
```

## Docker Swarm Deployment

For production deployment with Docker Swarm, create docker-compose files and stack configurations. Each service should be containerized with:

- Health checks
- Resource limits
- Environment variable configuration
- Service discovery

## Future Enhancements

- Database per service migration
- Service mesh (Istio) for advanced routing
- Distributed tracing (Jaeger)
- CQRS for read-heavy services
- GraphQL gateway option
- Redis for caching
- Elasticsearch for search service

## Notes

- The event bus currently uses an in-memory implementation. For production, replace with RabbitMQ, Redis Streams, or AWS EventBridge.
- Services are designed to be stateless and horizontally scalable.
- All services include comprehensive error handling and validation.
