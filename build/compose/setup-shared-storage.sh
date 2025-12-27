#!/bin/bash
# Setup script for shared storage directory on Docker Swarm nodes
# Run this script on EACH node (manager and worker) in your Swarm cluster

set -e

SHARED_STORAGE_PATH="${SHARED_STORAGE_PATH:-/var/lib/hirenova/shared-storage}"

echo "Setting up shared storage directory: $SHARED_STORAGE_PATH"

# Create directory if it doesn't exist
sudo mkdir -p "$SHARED_STORAGE_PATH"

# Set permissions (adjust as needed for your security requirements)
sudo chmod 777 "$SHARED_STORAGE_PATH"

# Ensure Docker can access it
sudo chown root:root "$SHARED_STORAGE_PATH" || true

echo "✓ Shared storage directory created at $SHARED_STORAGE_PATH"
echo "✓ Permissions set to 777"
echo ""
echo "Note: This directory must exist on ALL nodes where services using"
echo "      the shared-storage volume will be deployed."

