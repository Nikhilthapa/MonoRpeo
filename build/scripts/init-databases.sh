#!/bin/bash

# ==============================================================================
# Database Initialization Script - Domain-Based Databases
# ==============================================================================
# This script initializes all domain databases and runs migrations
# Usage: ./init-databases.sh [domain-name]
# If domain-name is provided, only that domain's database will be initialized
# Domains: identity, tenant, organization, job, audit, workflow
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

# Database configuration
DB_USER=${DB_USER:-postgres}
DB_PASSWORD=${DB_PASSWORD:-prisma}

# Domain databases mapping
declare -A DATABASES=(
    ["identity"]="identity_db"
    ["tenant"]="tenant_db"
    ["organization"]="organization_db"
    ["job"]="job_db"
    ["audit"]="audit_db"
    ["workflow"]="workflow_db"
)

declare -A PORTS=(
    ["identity"]="5433"
    ["tenant"]="5434"
    ["organization"]="5435"
    ["job"]="5436"
    ["audit"]="5437"
    ["workflow"]="5438"
)

declare -A HOSTS=(
    ["identity"]="postgres-identity"
    ["tenant"]="postgres-tenant"
    ["organization"]="postgres-organization"
    ["job"]="postgres-job"
    ["audit"]="postgres-audit"
    ["workflow"]="postgres-workflow"
)

declare -A SCHEMAS=(
    ["identity"]="prisma/schemas/identity/schema.prisma"
    ["tenant"]="prisma/schemas/tenant/schema.prisma"
    ["organization"]="prisma/schemas/organization/schema.prisma"
    ["job"]="prisma/schemas/job/schema.prisma"
    ["audit"]="prisma/schemas/audit/schema.prisma"
    ["workflow"]="prisma/schemas/workflow/schema.prisma"
)

# Function to wait for database to be ready
wait_for_db() {
    local host=$1
    local port=$2
    local db_name=$3
    local max_attempts=30
    local attempt=0

    echo -e "${YELLOW}Waiting for database ${db_name} to be ready...${NC}"
    
    while [ $attempt -lt $max_attempts ]; do
        if PGPASSWORD=${DB_PASSWORD} psql -h ${host} -p ${port} -U ${DB_USER} -d ${db_name} -c "SELECT 1" > /dev/null 2>&1; then
            echo -e "${GREEN}Database ${db_name} is ready!${NC}"
            return 0
        fi
        attempt=$((attempt + 1))
        echo -e "${YELLOW}Attempt ${attempt}/${max_attempts}...${NC}"
        sleep 2
    done

    echo -e "${RED}Database ${db_name} failed to become ready after ${max_attempts} attempts${NC}"
    return 1
}

# Function to initialize a single database
init_database() {
    local domain=$1
    local db_name=${DATABASES[$domain]}
    local port=${PORTS[$domain]}
    local host=${HOSTS[$domain]}
    local schema=${SCHEMAS[$domain]}

    if [ -z "$db_name" ]; then
        echo -e "${RED}Unknown domain: ${domain}${NC}"
        return 1
    fi

    echo -e "${GREEN}========================================${NC}"
    echo -e "${GREEN}Initializing ${domain} domain database${NC}"
    echo -e "${GREEN}========================================${NC}"

    # Wait for database to be ready
    wait_for_db ${host} ${port} ${db_name}

    # Check if database exists, create if not
    echo -e "${YELLOW}Checking if database ${db_name} exists...${NC}"
    if ! PGPASSWORD=${DB_PASSWORD} psql -h ${host} -p ${port} -U ${DB_USER} -lqt | cut -d \| -f 1 | grep -qw ${db_name}; then
        echo -e "${YELLOW}Creating database ${db_name}...${NC}"
        PGPASSWORD=${DB_PASSWORD} psql -h ${host} -p ${port} -U ${DB_USER} -c "CREATE DATABASE ${db_name};"
    else
        echo -e "${GREEN}Database ${db_name} already exists${NC}"
    fi

    # Run Prisma migrations for the domain
    echo -e "${YELLOW}Running Prisma migrations for ${domain} domain...${NC}"
    
    # Set DATABASE_URL for this domain
    export DATABASE_URL="postgresql://${DB_USER}:${DB_PASSWORD}@${host}:${port}/${db_name}?schema=public"
    
    # Navigate to project root
    cd ../../

    # Run migrations
    if [ -f "${schema}" ]; then
        echo -e "${YELLOW}Running prisma migrate deploy for ${domain}...${NC}"
        npx prisma migrate deploy --schema="${schema}" || {
            echo -e "${YELLOW}Migration command failed, trying migrate dev...${NC}"
            npx prisma migrate dev --schema="${schema}" --name init || echo -e "${YELLOW}Migration failed, skipping...${NC}"
        }
    else
        echo -e "${YELLOW}No Prisma schema found at ${schema}, skipping migrations${NC}"
    fi

    echo -e "${GREEN}✓ ${domain} domain database initialized successfully${NC}"
    echo ""
}

# Main execution
main() {
    local target_domain=$1

    echo -e "${GREEN}========================================${NC}"
    echo -e "${GREEN}Domain Database Initialization Script${NC}"
    echo -e "${GREEN}========================================${NC}"
    echo ""

    if [ -n "$target_domain" ]; then
        # Initialize specific domain
        init_database $target_domain
    else
        # Initialize all domains
        echo -e "${YELLOW}Initializing all domain databases...${NC}"
        echo ""
        
        for domain in "${!DATABASES[@]}"; do
            init_database $domain
        done
    fi

    echo -e "${GREEN}========================================${NC}"
    echo -e "${GREEN}Database initialization complete!${NC}"
    echo -e "${GREEN}========================================${NC}"
}

# Run main function
main "$@"
