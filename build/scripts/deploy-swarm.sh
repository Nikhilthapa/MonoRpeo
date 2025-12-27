#!/bin/bash

# Define colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

# Print banner
echo -e "${YELLOW}=================================${NC}"
echo -e "${YELLOW}    SPARIX SWARM DEPLOYMENT     ${NC}"
echo -e "${YELLOW}=================================${NC}"

# Check if Docker Swarm is initialized
if ! docker info | grep -q "Swarm: active"; then
  echo -e "${YELLOW}Docker Swarm is not initialized. Initializing...${NC}"
  docker swarm init
  if [ $? -ne 0 ]; then
    echo -e "${RED}Failed to initialize Docker Swarm. Please initialize manually.${NC}"
    exit 1
  fi
fi

# Check if stack name is provided
if [ -z "$1" ]; then
  STACK_NAME="sparix"
  echo -e "${YELLOW}No stack name provided. Using default: ${STACK_NAME}${NC}"
else
  STACK_NAME=$1
  echo -e "${YELLOW}Using stack name: ${STACK_NAME}${NC}"
fi

# Check if images exist
echo -e "${YELLOW}Checking for production images...${NC}"
MISSING_IMAGES=false

# Check for placio33/sparix:latest (main base image)
if ! docker image inspect placio33/sparix:latest > /dev/null 2>&1; then
  echo -e "${RED}Image placio33/sparix:latest not found.${NC}"
  MISSING_IMAGES=true
fi

# Check for email-scraper image
if ! docker image inspect placio33/email-scraper:latest > /dev/null 2>&1; then
  echo -e "${RED}Image placio33/email-scraper:latest not found.${NC}"
  MISSING_IMAGES=true
fi

if [ "$MISSING_IMAGES" = true ]; then
  echo -e "${YELLOW}Building missing production images...${NC}"
  ./build/scripts/build-images.sh

  if [ $? -ne 0 ]; then
    echo -e "${RED}Failed to build production images. Deployment aborted.${NC}"
    exit 1
  fi
fi

# Deploy or update the stack with retry logic
echo -e "${YELLOW}Deploying stack ${STACK_NAME}...${NC}"

MAX_RETRIES=10
RETRY_COUNT=0
DEPLOYMENT_SUCCESS=false

while [ $RETRY_COUNT -lt $MAX_RETRIES ]; do
  RETRY_COUNT=$((RETRY_COUNT + 1))
  echo -e "${YELLOW}Deployment attempt ${RETRY_COUNT}/${MAX_RETRIES}...${NC}"

  docker stack deploy -c ./build/compose/docker-compose.yml ${STACK_NAME}

  if [ $? -eq 0 ]; then
    echo -e "${GREEN}Stack ${STACK_NAME} deployed successfully on attempt ${RETRY_COUNT}.${NC}"
    DEPLOYMENT_SUCCESS=true
    break
  else
    echo -e "${RED}Deployment attempt ${RETRY_COUNT} failed.${NC}"

    if [ $RETRY_COUNT -lt $MAX_RETRIES ]; then
      echo -e "${YELLOW}Waiting 5 seconds before retry...${NC}"
      sleep 5

      # Check if swarm is still active
      if ! docker info | grep -q "Swarm: active"; then
        echo -e "${YELLOW}Swarm is not active. Re-initializing...${NC}"
        docker swarm init
      fi
    fi
  fi
done

if [ "$DEPLOYMENT_SUCCESS" = true ]; then
  # Display stack services
  echo -e "${YELLOW}Stack services:${NC}"
  docker stack services ${STACK_NAME}

  echo -e "\n${GREEN}Deployment completed successfully!${NC}"
else
  echo -e "${RED}Failed to deploy stack ${STACK_NAME} after ${MAX_RETRIES} attempts.${NC}"
  echo -e "${RED}Please check Docker Swarm status and network connectivity.${NC}"
  exit 1
fi

# Display useful commands
echo -e "\n${YELLOW}Useful commands:${NC}"
echo -e "${GREEN}View services:${NC} docker stack services ${STACK_NAME}"
echo -e "${GREEN}View containers:${NC} docker stack ps ${STACK_NAME}"
echo -e "${GREEN}View logs:${NC} docker service logs ${STACK_NAME}_[service-name]"
echo -e "${GREEN}Scale service:${NC} docker service scale ${STACK_NAME}_[service-name]=N"
echo -e "${GREEN}Remove stack:${NC} docker stack rm ${STACK_NAME}"

exit 0
