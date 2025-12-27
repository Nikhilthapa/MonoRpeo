#!/bin/bash
# hirenova Stack Management Script

set -e

STACK_NAME="${STACK_NAME:-hirenova}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

function show_help() {
    cat << EOF
hirenova Stack Manager
====================

Usage: $0 [command] [options]

Commands:
  deploy              Deploy the complete stack (includes email-scraper)
  update              Update all services with latest images
  scale               Scale specific services
  logs                View service logs
  status              Show stack status
  remove              Remove the stack
  restart             Restart a specific service
  email-scraper       Manage email-scraper service
  help                Show this help

Examples:
  $0 deploy                                    # Deploy full stack
  $0 scale email-scraper 20                   # Scale email-scraper to 20 replicas
  $0 logs email-scraper                       # View email-scraper logs
  $0 status                                   # Show all services status
  $0 email-scraper build                      # Build email-scraper image
  $0 email-scraper scale 15                   # Scale email-scraper
  $0 restart contact-lookup                   # Restart contact-lookup service

Environment Variables:
  STACK_NAME          Stack name (default: hirenova)

EOF
}

function check_swarm() {
    if ! docker info 2>/dev/null | grep -q "Swarm: active"; then
        echo -e "${RED}❌ Error: Docker is not in swarm mode${NC}"
        echo "Initialize swarm with: docker swarm init"
        exit 1
    fi
}

function deploy_stack() {
    echo -e "${BLUE}🚀 Deploying hirenova Stack${NC}"
    check_swarm

    cd "$SCRIPT_DIR"

    # Build all images using the main build script
    echo -e "${YELLOW}Building images...${NC}"
    ../scripts/build-images.sh

    echo -e "${YELLOW}Deploying stack...${NC}"
    docker stack deploy -c docker-compose.yml ${STACK_NAME}

    echo -e "${GREEN}✅ Stack deployed!${NC}"
    sleep 3
    show_status
}

function update_stack() {
    echo -e "${BLUE}🔄 Updating hirenova Stack${NC}"
    check_swarm

    cd "$SCRIPT_DIR"

    # Rebuild all images
    echo -e "${YELLOW}Rebuilding images...${NC}"
    ../scripts/build-images.sh

    echo -e "${YELLOW}Updating stack...${NC}"
    docker stack deploy -c docker-compose.yml ${STACK_NAME}

    echo -e "${GREEN}✅ Stack updated!${NC}"
}

function show_status() {
    echo -e "${BLUE}📊 Stack Status${NC}"
    echo ""

    echo "Services:"
    docker service ls | grep -E "NAME|${STACK_NAME}_" || echo "No services found"

    echo ""
    echo "Email Scraper Status:"
    docker service ps ${STACK_NAME}_email-scraper --format "table {{.Name}}\t{{.Node}}\t{{.CurrentState}}\t{{.Error}}" 2>/dev/null | head -15 || echo "Service not found"
}

function show_logs() {
    local service=$1
    if [ -z "$service" ]; then
        echo -e "${RED}❌ Error: Service name required${NC}"
        echo "Usage: $0 logs <service-name>"
        exit 1
    fi

    echo -e "${BLUE}📜 Logs for ${STACK_NAME}_${service}${NC}"
    docker service logs -f --tail 100 ${STACK_NAME}_${service}
}

function scale_service() {
    local service=$1
    local replicas=$2

    if [ -z "$service" ] || [ -z "$replicas" ]; then
        echo -e "${RED}❌ Error: Service name and replica count required${NC}"
        echo "Usage: $0 scale <service-name> <replicas>"
        exit 1
    fi

    echo -e "${BLUE}📈 Scaling ${STACK_NAME}_${service} to ${replicas} replicas${NC}"
    docker service scale ${STACK_NAME}_${service}=${replicas}
    echo -e "${GREEN}✅ Scaled!${NC}"
}

function restart_service() {
    local service=$1

    if [ -z "$service" ]; then
        echo -e "${RED}❌ Error: Service name required${NC}"
        echo "Usage: $0 restart <service-name>"
        exit 1
    fi

    echo -e "${BLUE}🔄 Restarting ${STACK_NAME}_${service}${NC}"
    docker service update --force ${STACK_NAME}_${service}
    echo -e "${GREEN}✅ Restarted!${NC}"
}

function remove_stack() {
    echo -e "${YELLOW}⚠️  WARNING: This will remove the entire ${STACK_NAME} stack!${NC}"
    read -p "Are you sure? (yes/no): " confirm

    if [ "$confirm" == "yes" ]; then
        echo -e "${BLUE}🗑️  Removing stack...${NC}"
        docker stack rm ${STACK_NAME}
        echo -e "${GREEN}✅ Stack removed!${NC}"
    else
        echo "Cancelled"
    fi
}

function manage_email_scraper() {
    local action=$1
    shift

    case $action in
        build)
            cd "$SCRIPT_DIR"
            echo -e "${YELLOW}Building email-scraper via build-images.sh...${NC}"
            ../scripts/build-images.sh
            ;;
        scale)
            local replicas=$1
            if [ -z "$replicas" ]; then
                echo -e "${RED}❌ Error: Replica count required${NC}"
                echo "Usage: $0 email-scraper scale <replicas>"
                exit 1
            fi
            scale_service "email-scraper" "$replicas"
            ;;
        logs)
            show_logs "email-scraper"
            ;;
        status)
            echo -e "${BLUE}📊 Email Scraper Status${NC}"
            docker service ps ${STACK_NAME}_email-scraper --format "table {{.Name}}\t{{.Node}}\t{{.CurrentState}}" 2>/dev/null || echo "Service not found"
            ;;
        restart)
            restart_service "email-scraper"
            ;;
        *)
            echo -e "${RED}❌ Unknown email-scraper action: $action${NC}"
            echo "Available actions: build, scale, logs, status, restart"
            exit 1
            ;;
    esac
}

# Main command dispatcher
case "${1:-help}" in
    deploy)
        deploy_stack
        ;;
    update)
        update_stack
        ;;
    status)
        show_status
        ;;
    logs)
        shift
        show_logs "$@"
        ;;
    scale)
        shift
        scale_service "$@"
        ;;
    restart)
        shift
        restart_service "$@"
        ;;
    remove)
        remove_stack
        ;;
    email-scraper)
        shift
        manage_email_scraper "$@"
        ;;
    help|--help|-h)
        show_help
        ;;
    *)
        echo -e "${RED}❌ Unknown command: $1${NC}"
        echo ""
        show_help
        exit 1
        ;;
esac

