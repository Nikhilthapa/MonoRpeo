#!/bin/bash
# Setup NFS server on Docker Swarm Manager Node
# Run this script ONLY on the manager node

set -e

SHARED_STORAGE_PATH="${SHARED_STORAGE_PATH:-/var/lib/hirenova/shared-storage}"

echo "Setting up NFS server on Manager Node..."
echo "Shared storage path: $SHARED_STORAGE_PATH"
echo ""

# Check if running as root or with sudo
if [ "$EUID" -ne 0 ]; then
    echo "Please run with sudo"
    exit 1
fi

# Install NFS server
echo "Installing NFS kernel server..."
if command -v apt-get &> /dev/null; then
    apt-get update
    apt-get install -y nfs-kernel-server
elif command -v yum &> /dev/null; then
    yum install -y nfs-utils
else
    echo "Error: Package manager not found. Please install nfs-kernel-server manually."
    exit 1
fi

# Create directory
echo "Creating shared storage directory..."
mkdir -p "$SHARED_STORAGE_PATH"
chmod 777 "$SHARED_STORAGE_PATH"

# Configure NFS export
echo "Configuring NFS export..."
EXPORT_LINE="$SHARED_STORAGE_PATH *(rw,sync,no_subtree_check,no_root_squash)"

# Check if export already exists
if ! grep -q "^$SHARED_STORAGE_PATH" /etc/exports 2>/dev/null; then
    echo "$EXPORT_LINE" >> /etc/exports
    echo "✓ Added NFS export to /etc/exports"
else
    echo "⚠ NFS export already exists in /etc/exports"
fi

# Apply exports
exportfs -ra

# Restart NFS service
if command -v systemctl &> /dev/null; then
    systemctl enable nfs-kernel-server
    systemctl restart nfs-kernel-server
    echo "✓ NFS server started and enabled"
else
    service nfs-kernel-server restart
    echo "✓ NFS server restarted"
fi

# Get manager IP
MANAGER_IP=$(hostname -I | awk '{print $1}')
echo ""
echo "✓ NFS server setup complete!"
echo ""
echo "Manager IP: $MANAGER_IP"
echo "Export path: $SHARED_STORAGE_PATH"
echo ""
echo "Next steps:"
echo "1. Set NFS_MANAGER_IP=$MANAGER_IP in your environment or .env.docker file"
echo "2. Run setup-nfs-worker.sh on each worker node"
echo "3. Deploy your stack with: docker stack deploy -c build/compose/docker-compose.yml <stack-name>"

