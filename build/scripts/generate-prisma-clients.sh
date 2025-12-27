#!/bin/bash

# ==============================================================================
# Generate Prisma Clients for All Domains
# ==============================================================================
# This script generates Prisma clients for all domain databases
# Usage: ./generate-prisma-clients.sh [domain-name]
# ==============================================================================

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Domain schemas
declare -A SCHEMAS=(
    ["identity"]="prisma/schemas/identity/schema.prisma"
    ["tenant"]="prisma/schemas/tenant/schema.prisma"
    ["organization"]="prisma/schemas/organization/schema.prisma"
    ["job"]="prisma/schemas/job/schema.prisma"
    ["audit"]="prisma/schemas/audit/schema.prisma"
    ["workflow"]="prisma/schemas/workflow/schema.prisma"
)

generate_client() {
    local domain=$1
    local schema=${SCHEMAS[$domain]}

    if [ -z "$schema" ]; then
        echo -e "${RED}Unknown domain: ${domain}${NC}"
        return 1
    fi

    if [ ! -f "$schema" ]; then
        echo -e "${RED}Schema file not found: ${schema}${NC}"
        return 1
    fi

    echo -e "${GREEN}Generating Prisma client for ${domain} domain...${NC}"
    npx prisma generate --schema="${schema}" || {
        echo -e "${RED}Failed to generate client for ${domain}${NC}"
        return 1
    }
    echo -e "${GREEN}✓ ${domain} client generated${NC}"
    echo ""
}

main() {
    local target_domain=$1

    echo -e "${GREEN}========================================${NC}"
    echo -e "${GREEN}Prisma Client Generation${NC}"
    echo -e "${GREEN}========================================${NC}"
    echo ""

    if [ -n "$target_domain" ]; then
        generate_client $target_domain
    else
        echo -e "${YELLOW}Generating clients for all domains...${NC}"
        echo ""
        
        for domain in "${!SCHEMAS[@]}"; do
            generate_client $domain
        done
    fi

    echo -e "${GREEN}========================================${NC}"
    echo -e "${GREEN}Client generation complete!${NC}"
    echo -e "${GREEN}========================================${NC}"
}

main "$@"
