#!/bin/bash

# --- Configuration ---
PUSH_TARGET="dockerhub" # nexus, dockerhub, or none

# Simple argument parsing
for arg in "$@"; do
  if [ "$arg" == "--no-push" ]; then
    PUSH_TARGET="none"
    break
  fi
  if [ "$arg" == "--dockerhub" ]; then
    PUSH_TARGET="dockerhub"
    break
  fi
done

# Docker Registry Configuration
REGISTRY_URL=""
REGISTRY_USER=""
REGISTRY_PASSWORD=""
NEXUS_REPOSITORY_NAME=""

# If push flag is enabled, set Nexus credentials
if [ "$PUSH_TARGET" = "nexus" ]; then
  echo -e "${YELLOW}Nexus push enabled.${NC}"
  REGISTRY_URL="nexus.sparixglobal.com"
  REGISTRY_USER="admin"
  REGISTRY_PASSWORD="Sparix@156398"
  NEXUS_REPOSITORY_NAME="docker-hosted"

  if [ -z "$REGISTRY_PASSWORD" ]; then
    echo -e "${RED}Error: NEXUS_PASSWORD environment variable is not set.${NC}"
    echo -e "${YELLOW}Please set it and try again, e.g., export NEXUS_PASSWORD='your_password'${NC}"
    exit 1
  fi
fi

# Define colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

# Print banner
echo -e "${YELLOW}=================================${NC}"
echo -e "${YELLOW}   SPARIX DOCKER IMAGE BUILDER   ${NC}"
echo -e "${YELLOW}=================================${NC}"

# Get the root directory
ROOT_DIR=$(git rev-parse --show-toplevel 2>/dev/null)
if [ $? -ne 0 ]; then
  ROOT_DIR=$(pwd)
fi

# Function to build the base image
build_base_image() {
  # For Docker Hub, set the tag below to your full image name, e.g., "username/repository:tag"
  local tag="placio33/sparix:latest"
  local full_tag="$tag"

  if [ "$PUSH_TARGET" = "nexus" ]; then
    if [ -n "$REGISTRY_URL" ]; then
      if [ -n "$NEXUS_REPOSITORY_NAME" ]; then
        full_tag="$REGISTRY_URL/$NEXUS_REPOSITORY_NAME/$tag"
      else
        full_tag="$REGISTRY_URL/$tag"
      fi
    fi
  elif [ "$PUSH_TARGET" = "dockerhub" ]; then
    # For Docker Hub, the 'tag' variable itself is used as the full image name.
    # 'full_tag' is already initialized with 'tag', so no changes are needed here.
    : # This is a no-op, just to have a body for the elif.
  fi

  echo -e "${YELLOW}Building base image...${NC}"

  docker build -t "$full_tag" -f "$ROOT_DIR/build/Dockerfile" "$ROOT_DIR"

  if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Successfully built base image${NC}"

    if [ "$PUSH_TARGET" = "nexus" ] || [ "$PUSH_TARGET" = "dockerhub" ]; then
      echo -e "${YELLOW}Pushing image to ${PUSH_TARGET}...${NC}"
      docker push "$full_tag"
      if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ Successfully pushed image to ${PUSH_TARGET}${NC}"
      else
        echo -e "${RED}✗ Failed to push image to ${PUSH_TARGET}${NC}"
        exit 1
      fi
    else
      echo -e "${GREEN}✓ Image built locally as ${full_tag}${NC}"
    fi
  else
    echo -e "${RED}✗ Failed to build base image${NC}"
    exit 1
  fi
}

# Function to build the email-scraper image
build_email_scraper_image() {
  local tag="placio33/email-scraper:latest"
  local full_tag="$tag"

  if [ "$PUSH_TARGET" = "nexus" ]; then
    if [ -n "$REGISTRY_URL" ]; then
      if [ -n "$NEXUS_REPOSITORY_NAME" ]; then
        full_tag="$REGISTRY_URL/$NEXUS_REPOSITORY_NAME/$tag"
      else
        full_tag="$REGISTRY_URL/$tag"
      fi
    fi
  fi

  echo -e "${YELLOW}Building email-scraper image...${NC}"

  docker build -t "$full_tag" -f "$ROOT_DIR/apps/email-scraper-go/Dockerfile" "$ROOT_DIR/apps/email-scraper-go"

  if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Successfully built email-scraper image${NC}"

    if [ "$PUSH_TARGET" = "nexus" ] || [ "$PUSH_TARGET" = "dockerhub" ]; then
      echo -e "${YELLOW}Pushing email-scraper image to ${PUSH_TARGET}...${NC}"
      docker push "$full_tag"
      if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ Successfully pushed email-scraper image to ${PUSH_TARGET}${NC}"
      else
        echo -e "${RED}✗ Failed to push email-scraper image to ${PUSH_TARGET}${NC}"
        exit 1
      fi
    else
      echo -e "${GREEN}✓ Email-scraper image built locally as ${full_tag}${NC}"
    fi
  else
    echo -e "${RED}✗ Failed to build email-scraper image${NC}"
    exit 1
  fi
}

# Build the base image
build_base_image

# Build the email-scraper image
build_email_scraper_image

echo -e "${GREEN}All images built successfully${NC}"

exit 0
