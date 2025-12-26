# ERP Database Schema Documentation

Welcome to the ERP-level scalable database schema documentation for the Hirenova job portal platform.

## Documentation Index

### 📚 Main Documentation

1. **[ERP Database Schema](./ERP_DATABASE_SCHEMA.md)** - Complete reference guide
   - Architecture overview
   - Multi-tenancy system
   - Audit trail system
   - Dynamic fields
   - Workflow management
   - Version history
   - Performance optimizations
   - Best practices

2. **[Quick Reference Guide](./ERP_SCHEMA_QUICK_REFERENCE.md)** - Fast lookup guide
   - Model relationships diagram
   - Common queries
   - Index reference
   - Field types
   - Enums reference
   - Common patterns

3. **[API Usage Examples](./ERP_SCHEMA_API_EXAMPLES.md)** - Code examples
   - Multi-tenant operations
   - CRUD with audit trail
   - Workflow operations
   - Custom fields
   - Version history
   - Advanced queries

4. **[Setup & Migration Guide](./ERP_SCHEMA_SETUP_GUIDE.md)** - Implementation guide
   - Prerequisites
   - Initial setup
   - Database migration
   - Seed data
   - Post-migration tasks
   - Troubleshooting

### 🚀 Deployment Documentation

- **[Vercel Deployment](./VERCEL_DEPLOYMENT.md)** - Production deployment guide
- **[Vercel Deployment Checklist](./VERCEL_DEPLOYMENT_CHECKLIST.md)** - Pre-deployment checklist

## Quick Start

### For Developers

1. **New to the schema?** Start with [ERP Database Schema](./ERP_DATABASE_SCHEMA.md)
2. **Need quick lookup?** Use [Quick Reference Guide](./ERP_SCHEMA_QUICK_REFERENCE.md)
3. **Writing code?** Check [API Usage Examples](./ERP_SCHEMA_API_EXAMPLES.md)
4. **Setting up?** Follow [Setup & Migration Guide](./ERP_SCHEMA_SETUP_GUIDE.md)

### For Database Administrators

1. Review [Setup & Migration Guide](./ERP_SCHEMA_SETUP_GUIDE.md)
2. Check [Performance Optimizations](./ERP_DATABASE_SCHEMA.md#performance-optimizations)
3. Review [Troubleshooting](./ERP_SCHEMA_SETUP_GUIDE.md#troubleshooting)

## Key Features

### 🏢 Multi-Tenancy
- Complete data isolation per tenant
- Tenant-scoped queries and operations
- Subscription and billing management

### 📋 Audit Trails
- Complete CRUD operation tracking
- Before/after value changes
- User action logging with IP and user agent

### 🔧 Dynamic Fields
- Custom field definitions per entity type
- Tenant-specific or global fields
- Support for multiple field types

### 🔄 Workflow Management
- Multi-step approval workflows
- State machine support
- Entity-type agnostic workflows

### 📊 Version History
- Entity change tracking
- Version snapshots
- Rollback capabilities

### ⚡ Performance
- Comprehensive indexing strategy
- Optimistic locking
- Connection pooling support

## Schema Statistics

- **Total Models**: 25+
- **ERP Models**: 8
- **Indexes**: 50+
- **Enums**: 6
- **Relationships**: Complete audit and workflow relationships

## Getting Help

### Common Questions

**Q: How do I add a new model with ERP features?**
A: See [ERP Database Schema - Enhanced Models](./ERP_DATABASE_SCHEMA.md#8-enhanced-models)

**Q: How do I query with tenant isolation?**
A: See [Multi-Tenant Operations](./ERP_SCHEMA_API_EXAMPLES.md#multi-tenant-operations)

**Q: How do I create audit logs automatically?**
A: See [Setup Guide - Middleware](./ERP_SCHEMA_SETUP_GUIDE.md#2-set-up-middleware-for-audit-logs)

**Q: How do I optimize slow queries?**
A: See [Performance Optimizations](./ERP_DATABASE_SCHEMA.md#performance-optimizations)

### Troubleshooting

- Check [Setup Guide Troubleshooting](./ERP_SCHEMA_SETUP_GUIDE.md#troubleshooting)
- Review [Quick Reference - Error Handling](./ERP_SCHEMA_QUICK_REFERENCE.md#error-handling)

## Version Information

- **Schema Version**: 1.0.0
- **Prisma Version**: 7.2.0
- **Last Updated**: 2024

## Contributing

When updating the schema:

1. Update the schema file: `prisma/schema.prisma`
2. Create migration: `npx prisma migrate dev --name your_change`
3. Update relevant documentation
4. Add examples if introducing new patterns
5. Update this README if adding new documentation files

## Related Resources

- [Prisma Documentation](https://www.prisma.io/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Prisma Best Practices](https://www.prisma.io/docs/guides/performance-and-optimization)

---

**Documentation Version**: 1.0.0
