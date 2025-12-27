#!/bin/bash

# ==============================================================================
# Database Migration Script - Split Single Database to Domain Databases
# ==============================================================================
# This script migrates data from a single database to domain-specific databases
# Usage: ./migrate-to-domain-databases.sh [source-db-url] [backup-dir]
# ==============================================================================

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Load environment variables
if [ -f ../../.env.docker ]; then
    export $(cat ../../.env.docker | grep -v '^#' | xargs)
fi

# Database URLs
SOURCE_DB_URL=${1:-${DATABASE_URL}}
BACKUP_DIR=${2:-./backups}

IDENTITY_DB_URL=${IDENTITY_DATABASE_URL}
TENANT_DB_URL=${TENANT_DATABASE_URL}
ORGANIZATION_DB_URL=${ORGANIZATION_DATABASE_URL}
JOB_DB_URL=${JOB_DATABASE_URL}
AUDIT_DB_URL=${AUDIT_DATABASE_URL}
WORKFLOW_DB_URL=${WORKFLOW_DATABASE_URL}

# Database names
IDENTITY_DB=${IDENTITY_DB_NAME:-identity_db}
TENANT_DB=${TENANT_DB_NAME:-tenant_db}
ORGANIZATION_DB=${ORGANIZATION_DB_NAME:-organization_db}
JOB_DB=${JOB_DB_NAME:-job_db}
AUDIT_DB=${AUDIT_DB_NAME:-audit_db}
WORKFLOW_DB=${WORKFLOW_DB_NAME:-workflow_db}

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}Database Migration Script${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""

# Create backup directory
mkdir -p ${BACKUP_DIR}

# Function to extract database connection details
extract_db_info() {
    local url=$1
    echo $url | sed -E 's|postgresql://([^:]+):([^@]+)@([^:]+):([^/]+)/([^?]+).*|\1 \2 \3 \4 \5|'
}

# Function to backup table
backup_table() {
    local db_url=$1
    local table=$2
    local output_file=$3
    
    echo -e "${YELLOW}Backing up table ${table}...${NC}"
    PGPASSWORD=$(echo $db_url | sed -E 's|postgresql://[^:]+:([^@]+)@.*|\1|') \
    pg_dump "$db_url" -t "$table" -F c -f "$output_file" || echo -e "${YELLOW}Table ${table} not found, skipping...${NC}"
}

# Function to restore table
restore_table() {
    local db_url=$1
    local backup_file=$2
    
    if [ -f "$backup_file" ]; then
        echo -e "${YELLOW}Restoring from ${backup_file}...${NC}"
        PGPASSWORD=$(echo $db_url | sed -E 's|postgresql://[^:]+:([^@]+)@.*|\1|') \
        pg_restore -d "$db_url" --clean --if-exists "$backup_file" || echo -e "${YELLOW}Restore failed, continuing...${NC}"
    fi
}

echo -e "${GREEN}Step 1: Backup source database${NC}"
echo -e "${YELLOW}Creating full backup...${NC}"
BACKUP_FILE="${BACKUP_DIR}/full_backup_$(date +%Y%m%d_%H%M%S).sql"
PGPASSWORD=$(echo $SOURCE_DB_URL | sed -E 's|postgresql://[^:]+:([^@]+)@.*|\1|') \
pg_dump "$SOURCE_DB_URL" -F c -f "${BACKUP_FILE}.dump" || {
    echo -e "${RED}Backup failed!${NC}"
    exit 1
}
echo -e "${GREEN}✓ Backup created: ${BACKUP_FILE}.dump${NC}"
echo ""

echo -e "${GREEN}Step 2: Backup individual tables${NC}"

# Identity Database Tables
echo -e "${YELLOW}Backing up Identity domain tables...${NC}"
backup_table "$SOURCE_DB_URL" "users" "${BACKUP_DIR}/users.dump"
backup_table "$SOURCE_DB_URL" "system_roles" "${BACKUP_DIR}/system_roles.dump"
backup_table "$SOURCE_DB_URL" "system_permissions" "${BACKUP_DIR}/system_permissions.dump"
backup_table "$SOURCE_DB_URL" "system_role_permissions" "${BACKUP_DIR}/system_role_permissions.dump"
backup_table "$SOURCE_DB_URL" "skills" "${BACKUP_DIR}/skills.dump"
backup_table "$SOURCE_DB_URL" "user_skills" "${BACKUP_DIR}/user_skills.dump"
backup_table "$SOURCE_DB_URL" "experiences" "${BACKUP_DIR}/experiences.dump"
backup_table "$SOURCE_DB_URL" "educations" "${BACKUP_DIR}/educations.dump"
backup_table "$SOURCE_DB_URL" "resumes" "${BACKUP_DIR}/resumes.dump"

# Tenant Database Tables
echo -e "${YELLOW}Backing up Tenant domain tables...${NC}"
backup_table "$SOURCE_DB_URL" "tenants" "${BACKUP_DIR}/tenants.dump"
backup_table "$SOURCE_DB_URL" "custom_fields" "${BACKUP_DIR}/custom_fields.dump"
backup_table "$SOURCE_DB_URL" "custom_field_values" "${BACKUP_DIR}/custom_field_values.dump"

# Organization Database Tables
echo -e "${YELLOW}Backing up Organization domain tables...${NC}"
backup_table "$SOURCE_DB_URL" "companies" "${BACKUP_DIR}/companies.dump"
backup_table "$SOURCE_DB_URL" "company_users" "${BACKUP_DIR}/company_users.dump"
backup_table "$SOURCE_DB_URL" "company_roles" "${BACKUP_DIR}/company_roles.dump"
backup_table "$SOURCE_DB_URL" "company_permissions" "${BACKUP_DIR}/company_permissions.dump"
backup_table "$SOURCE_DB_URL" "company_role_permissions" "${BACKUP_DIR}/company_role_permissions.dump"
backup_table "$SOURCE_DB_URL" "vendors" "${BACKUP_DIR}/vendors.dump"
backup_table "$SOURCE_DB_URL" "vendor_users" "${BACKUP_DIR}/vendor_users.dump"
backup_table "$SOURCE_DB_URL" "vendor_roles" "${BACKUP_DIR}/vendor_roles.dump"
backup_table "$SOURCE_DB_URL" "vendor_permissions" "${BACKUP_DIR}/vendor_permissions.dump"
backup_table "$SOURCE_DB_URL" "vendor_role_permissions" "${BACKUP_DIR}/vendor_role_permissions.dump"

# Job Database Tables
echo -e "${YELLOW}Backing up Job domain tables...${NC}"
backup_table "$SOURCE_DB_URL" "jobs" "${BACKUP_DIR}/jobs.dump"
backup_table "$SOURCE_DB_URL" "job_applications" "${BACKUP_DIR}/job_applications.dump"
backup_table "$SOURCE_DB_URL" "saved_jobs" "${BACKUP_DIR}/saved_jobs.dump"
backup_table "$SOURCE_DB_URL" "job_skills" "${BACKUP_DIR}/job_skills.dump"

# Audit Database Tables
echo -e "${YELLOW}Backing up Audit domain tables...${NC}"
backup_table "$SOURCE_DB_URL" "audit_logs" "${BACKUP_DIR}/audit_logs.dump"
backup_table "$SOURCE_DB_URL" "version_history" "${BACKUP_DIR}/version_history.dump"

# Workflow Database Tables
echo -e "${YELLOW}Backing up Workflow domain tables...${NC}"
backup_table "$SOURCE_DB_URL" "workflows" "${BACKUP_DIR}/workflows.dump"
backup_table "$SOURCE_DB_URL" "workflow_steps" "${BACKUP_DIR}/workflow_steps.dump"
backup_table "$SOURCE_DB_URL" "workflow_instances" "${BACKUP_DIR}/workflow_instances.dump"

echo ""
echo -e "${GREEN}Step 3: Restore to domain databases${NC}"

# Restore Identity Database
echo -e "${YELLOW}Restoring Identity database...${NC}"
restore_table "$IDENTITY_DB_URL" "${BACKUP_DIR}/users.dump"
restore_table "$IDENTITY_DB_URL" "${BACKUP_DIR}/system_roles.dump"
restore_table "$IDENTITY_DB_URL" "${BACKUP_DIR}/system_permissions.dump"
restore_table "$IDENTITY_DB_URL" "${BACKUP_DIR}/system_role_permissions.dump"
restore_table "$IDENTITY_DB_URL" "${BACKUP_DIR}/skills.dump"
restore_table "$IDENTITY_DB_URL" "${BACKUP_DIR}/user_skills.dump"
restore_table "$IDENTITY_DB_URL" "${BACKUP_DIR}/experiences.dump"
restore_table "$IDENTITY_DB_URL" "${BACKUP_DIR}/educations.dump"
restore_table "$IDENTITY_DB_URL" "${BACKUP_DIR}/resumes.dump"

# Restore Tenant Database
echo -e "${YELLOW}Restoring Tenant database...${NC}"
restore_table "$TENANT_DB_URL" "${BACKUP_DIR}/tenants.dump"
restore_table "$TENANT_DB_URL" "${BACKUP_DIR}/custom_fields.dump"
restore_table "$TENANT_DB_URL" "${BACKUP_DIR}/custom_field_values.dump"

# Restore Organization Database
echo -e "${YELLOW}Restoring Organization database...${NC}"
restore_table "$ORGANIZATION_DB_URL" "${BACKUP_DIR}/companies.dump"
restore_table "$ORGANIZATION_DB_URL" "${BACKUP_DIR}/company_users.dump"
restore_table "$ORGANIZATION_DB_URL" "${BACKUP_DIR}/company_roles.dump"
restore_table "$ORGANIZATION_DB_URL" "${BACKUP_DIR}/company_permissions.dump"
restore_table "$ORGANIZATION_DB_URL" "${BACKUP_DIR}/company_role_permissions.dump"
restore_table "$ORGANIZATION_DB_URL" "${BACKUP_DIR}/vendors.dump"
restore_table "$ORGANIZATION_DB_URL" "${BACKUP_DIR}/vendor_users.dump"
restore_table "$ORGANIZATION_DB_URL" "${BACKUP_DIR}/vendor_roles.dump"
restore_table "$ORGANIZATION_DB_URL" "${BACKUP_DIR}/vendor_permissions.dump"
restore_table "$ORGANIZATION_DB_URL" "${BACKUP_DIR}/vendor_role_permissions.dump"

# Restore Job Database
echo -e "${YELLOW}Restoring Job database...${NC}"
restore_table "$JOB_DB_URL" "${BACKUP_DIR}/jobs.dump"
restore_table "$JOB_DB_URL" "${BACKUP_DIR}/job_applications.dump"
restore_table "$JOB_DB_URL" "${BACKUP_DIR}/saved_jobs.dump"
restore_table "$JOB_DB_URL" "${BACKUP_DIR}/job_skills.dump"

# Restore Audit Database
echo -e "${YELLOW}Restoring Audit database...${NC}"
restore_table "$AUDIT_DB_URL" "${BACKUP_DIR}/audit_logs.dump"
restore_table "$AUDIT_DB_URL" "${BACKUP_DIR}/version_history.dump"

# Restore Workflow Database
echo -e "${YELLOW}Restoring Workflow database...${NC}"
restore_table "$WORKFLOW_DB_URL" "${BACKUP_DIR}/workflows.dump"
restore_table "$WORKFLOW_DB_URL" "${BACKUP_DIR}/workflow_steps.dump"
restore_table "$WORKFLOW_DB_URL" "${BACKUP_DIR}/workflow_instances.dump"

echo ""
echo -e "${GREEN}Step 4: Update denormalized fields${NC}"
echo -e "${YELLOW}Note: Denormalized fields should be updated via application logic${NC}"
echo -e "${YELLOW}or event-driven updates after migration${NC}"

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}Migration complete!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Run Prisma migrations for each domain database"
echo "2. Update denormalized fields (userEmail, userName, etc.)"
echo "3. Verify data integrity"
echo "4. Test application with new database structure"
