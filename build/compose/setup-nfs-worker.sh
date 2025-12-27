#!/bin/bash
# Setup NFS client on Docker Swarm Worker Node
# Run this script on EACH worker node

set -e

if [ -z "$1" ]; then
    echo "Usage: $0 <MANAGER_IP>"
    echo "Example: $0 192.168.1.100"
    exit 1
fi

MANAGER_IP="$1"
SHARED_STORAGE_PATH="${SHARED_STORAGE_PATH:-/var/lib/hirenova/shared-storage}"

echo "Setting up NFS client on Worker Node..."
echo "Manager IP: $MANAGER_IP"
echo "Mount point: $SHARED_STORAGE_PATH"
echo ""

# Check if running as root or with sudo
if [ "$EUID" -ne 0 ]; then
    echo "Please run with sudo"
    exit 1
fi

# Install NFS client
echo "Installing NFS client..."
if command -v apt-get &> /dev/null; then
    apt-get update
    apt-get install -y nfs-common
elif command -v yum &> /dev/null; then
    yum install -y nfs-utils
else
    echo "Error: Package manager not found. Please install nfs-common manually."
    exit 1
fi

# Create mount point
echo "Creating mount point..."
mkdir -p "$SHARED_STORAGE_PATH"

# Test NFS connection
echo "Testing NFS connection to $MANAGER_IP..."
if showmount -e "$MANAGER_IP" &>/dev/null; then
    echo "✓ NFS server is accessible"
    showmount -e "$MANAGER_IP"
else
    echo "⚠ Warning: Could not connect to NFS server at $MANAGER_IP"
    echo "  Make sure the manager node has NFS server running and firewall allows NFS traffic"
fi

# Mount NFS share
echo "Mounting NFS share..."
if mountpoint -q "$SHARED_STORAGE_PATH"; then
    echo "⚠ Mount point already mounted, unmounting first..."
    umount "$SHARED_STORAGE_PATH" || true
fi

mount -t nfs4 "$MANAGER_IP:$SHARED_STORAGE_PATH" "$SHARED_STORAGE_PATH"
echo "✓ NFS share mounted"

# Add to fstab for persistence
FSTAB_LINE="$MANAGER_IP:$SHARED_STORAGE_PATH $SHARED_STORAGE_PATH nfs4 defaults,noatime 0 0"

if ! grep -q "$SHARED_STORAGE_PATH" /etc/fstab 2>/dev/null; then
    echo "$FSTAB_LINE" >> /etc/fstab
    echo "✓ Added to /etc/fstab for automatic mounting on boot"
else
    echo "⚠ Entry already exists in /etc/fstab"
fi

echo ""
echo "✓ NFS client setup complete!"
echo "  The shared storage is now mounted from the manager node."

