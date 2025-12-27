#!/bin/bash

# Define colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

# Print banner
echo -e "${YELLOW}=================================${NC}"
echo -e "${YELLOW}     SPARIX DEV ENVIRONMENT     ${NC}"
echo -e "${YELLOW}=================================${NC}"

# Function to check if Docker is running
check_docker() {
  if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}Error: Docker is not running. Please start Docker and try again.${NC}"
    exit 1
  fi
}

# Function to stop the development environment
stop_dev() {
  echo -e "${YELLOW}Stopping development environment...${NC}"
  docker-compose -f ./build/compose/docker-compose.dev.yml down
  if [ $? -eq 0 ]; then
    echo -e "${GREEN}Development environment stopped successfully.${NC}"
  else
    echo -e "${RED}Failed to stop the development environment.${NC}"
    exit 1
  fi
}

# Check Docker status
check_docker

# Parse command line arguments
case "$1" in
  start)
    echo -e "${YELLOW}Starting development environment...${NC}"
    docker-compose -f ./build/compose/docker-compose.dev.yml up -d
    
    if [ $? -eq 0 ]; then
      echo -e "${GREEN}Development environment started successfully.${NC}"
      echo -e "${YELLOW}Services are available at:${NC}"
      echo -e "  ${GREEN}API Gateway:${NC} http://localhost:3000"
      echo -e "  ${GREEN}Job Processor:${NC} http://localhost:3001"
      echo -e "  ${GREEN}Scraper:${NC} http://localhost:3002"
      echo -e "  ${GREEN}UI Tools:${NC} http://localhost:3003"
      echo -e "  ${GREEN}Contact lookup:${NC} http://localhost:3004"
    else
      echo -e "${RED}Failed to start the development environment.${NC}"
      exit 1
    fi
    ;;
    
  stop)
    stop_dev
    ;;
    
  restart)
    stop_dev
    echo -e "${YELLOW}Restarting development environment...${NC}"
    docker-compose -f ./build/compose/docker-compose.dev.yml up -d
    if [ $? -eq 0 ]; then
      echo -e "${GREEN}Development environment restarted successfully.${NC}"
    else
      echo -e "${RED}Failed to restart the development environment.${NC}"
      exit 1
    fi
    ;;
    
  logs)
    if [ -z "$2" ]; then
      echo -e "${RED}Error: Please specify a service name to view logs.${NC}"
      echo -e "Usage: $0 logs [service-name]"
      echo -e "Available services: api-gateway, job-processor, scraper, ui-tools"
      exit 1
    fi
    
    echo -e "${YELLOW}Viewing logs for ${2}...${NC}"
    docker-compose -f ./build/compose/docker-compose.dev.yml logs -f "$2"
    ;;
    
  status)
    echo -e "${YELLOW}Checking status of development services...${NC}"
    docker-compose -f ./build/compose/docker-compose.dev.yml ps
    ;;
    
  build)
    if [ -z "$2" ]; then
      echo -e "${RED}Error: Please specify a service name to rebuild.${NC}"
      echo -e "Usage: $0 build [service-name]"
      echo -e "Available services: api-gateway, job-processor, scraper, ui-tools"
      exit 1
    fi
    
    echo -e "${YELLOW}Rebuilding ${2}...${NC}"
    docker-compose -f ./build/compose/docker-compose.dev.yml build "$2"
    docker-compose -f ./build/compose/docker-compose.dev.yml up -d --no-deps "$2"
    
    if [ $? -eq 0 ]; then
      echo -e "${GREEN}Service ${2} rebuilt and restarted successfully.${NC}"
    else
      echo -e "${RED}Failed to rebuild service ${2}.${NC}"
      exit 1
    fi
    ;;
    
  *)
    echo -e "${YELLOW}SPARIX Development Environment Management${NC}"
    echo -e "\nUsage: $0 [command] [options]"
    echo -e "\nCommands:"
    echo -e "  ${GREEN}start${NC}         Start the development environment"
    echo -e "  ${GREEN}stop${NC}          Stop the development environment"
    echo -e "  ${GREEN}restart${NC}       Restart the development environment"
    echo -e "  ${GREEN}logs${NC} [service] View logs of a specific service"
    echo -e "  ${GREEN}status${NC}        Check the status of all services"
    echo -e "  ${GREEN}build${NC} [service] Rebuild and restart a specific service"
    echo -e "\nExamples:"
    echo -e "  $0 start"
    echo -e "  $0 logs api-gateway"
    echo -e "  $0 build scraper"
    exit 1
    ;;
esac

exit 0