# NFS Shared Storage Setup for Docker Swarm

## Overview

This Docker Swarm deployment uses **NFS (Network File System)** to share storage across all nodes (managers and workers). This ensures that all containers have access to the same shared storage directory, eliminating data duplication and synchronization issues.

## Architecture

- **Manager Node**: Acts as the NFS server, hosting the shared storage directory
- **Worker Nodes**: Mount the manager's storage via NFS, providing transparent access to shared files
- **Docker Volume**: Uses Docker's built-in NFS driver to mount the shared storage in containers

## Benefits

✅ **True Shared Storage**: All nodes access the same files (no duplication)  
✅ **Immediate Consistency**: Changes on one node are instantly visible to all nodes  
✅ **Single Source of Truth**: All data stored on the manager node  
✅ **Simplified Management**: No need to sync data between nodes  

## Prerequisites

- Docker Swarm cluster with at least one manager and one worker node
- SSH access to all nodes (manager and workers)
- Root or sudo access on all nodes
- Network connectivity between nodes (NFS uses ports 111, 2049)

## Setup Instructions

### Step 1: Setup NFS Server on Manager Node

1. **SSH into your manager node**

2. **Run the setup script**:
   ```bash
   sudo ./build/compose/setup-nfs-manager.sh
   ```

   Or manually:
   ```bash
   # Install NFS server
   sudo apt-get update
   sudo apt-get install -y nfs-kernel-server

   # Create shared directory
   sudo mkdir -p /var/lib/sparix/shared-storage
   sudo chmod 777 /var/lib/sparix/shared-storage

   # Configure NFS export
   echo "/var/lib/sparix/shared-storage *(rw,sync,no_subtree_check,no_root_squash)" | sudo tee -a /etc/exports

   # Apply exports and restart service
   sudo exportfs -ra
   sudo systemctl restart nfs-kernel-server
   sudo systemctl enable nfs-kernel-server
   ```

3. **Note the Manager IP address** (displayed by the script, or find it with `hostname -I`)

### Step 2: Setup NFS Client on Worker Nodes

For **each worker node**:

1. **SSH into the worker node**

2. **Run the setup script** (replace `<MANAGER_IP>` with your manager's IP):
   ```bash
   sudo ./build/compose/setup-nfs-worker.sh <MANAGER_IP>
   ```

   Or manually:
   ```bash
   # Install NFS client
   sudo apt-get update
   sudo apt-get install -y nfs-common

   # Create mount point
   sudo mkdir -p /var/lib/sparix/shared-storage

   # Test NFS connection
   showmount -e <MANAGER_IP>

   # Mount NFS share
   sudo mount -t nfs4 <MANAGER_IP>:/var/lib/sparix/shared-storage /var/lib/sparix/shared-storage

   # Make mount persistent (add to /etc/fstab)
   echo "<MANAGER_IP>:/var/lib/sparix/shared-storage /var/lib/sparix/shared-storage nfs4 defaults,noatime 0 0" | sudo tee -a /etc/fstab
   ```

### Step 3: Configure Environment Variable

Set the `NFS_MANAGER_IP` environment variable to your manager node's IP address.

**Option A: Export in current session**
```bash
export NFS_MANAGER_IP=192.168.1.100  # Replace with your manager IP
```

**Option B: Add to `.env.docker` file** (recommended)
```bash
echo "NFS_MANAGER_IP=192.168.1.100" >> .env.docker  # Replace with your manager IP
```

**Option C: Set in Docker Swarm config**
```bash
docker config create nfs_manager_ip - <<< "NFS_MANAGER_IP=192.168.1.100"
```

### Step 4: Deploy Stack

Deploy your Docker Swarm stack:
```bash
docker stack deploy -c build/compose/docker-compose.yml <stack-name>
```

## Verification

### Check NFS Server Status (Manager Node)
```bash
# Check NFS server is running
sudo systemctl status nfs-kernel-server

# List exported directories
sudo exportfs -v

# Check NFS connections
sudo netstat -tuln | grep 2049
```

### Check NFS Client Status (Worker Nodes)
```bash
# Check if NFS share is mounted
mount | grep nfs4

# Test access to shared directory
ls -la /var/lib/sparix/shared-storage

# Check NFS mount in /etc/fstab
cat /etc/fstab | grep sparix
```

### Verify Docker Volume
```bash
# Check volume configuration
docker volume inspect <stack-name>_shared-storage

# Should show NFS configuration with manager IP
```

### Test from Container
```bash
# Exec into a running container
docker exec -it <container-name> sh

# Inside container, check mounted volume
ls -la /shared

# Create a test file
echo "test" > /shared/test.txt

# Verify file appears on manager node
cat /var/lib/sparix/shared-storage/test.txt
```

## Configuration Details

### Volume Configuration

The `docker-compose.yml` uses the following NFS volume configuration:

```yaml
volumes:
  shared-storage:
    driver: local
    driver_opts:
      type: nfs4
      o: addr=${NFS_MANAGER_IP:-},rw,noatime,rsize=8192,wsize=8192,tcp,timeo=14
      device: ":/var/lib/sparix/shared-storage"
```

**Parameters Explained:**
- `type: nfs4` - Uses NFS version 4
- `addr=${NFS_MANAGER_IP}` - Manager node IP address (must be set)
- `rw` - Read-write access
- `noatime` - Don't update access times (improves performance)
- `rsize=8192, wsize=8192` - Read/write buffer sizes (8KB)
- `tcp` - Use TCP protocol (more reliable than UDP)
- `timeo=14` - Timeout in tenths of seconds (1.4 seconds)

### Customizing Storage Path

To use a different path for shared storage:

1. **Set environment variable**:
   ```bash
   export SHARED_STORAGE_PATH=/custom/path/to/storage
   ```

2. **Update NFS export on manager**:
   ```bash
   # Update /etc/exports with new path
   sudo nano /etc/exports
   sudo exportfs -ra
   ```

3. **Update docker-compose.yml** if needed (the `device` path will use `${SHARED_STORAGE_PATH}`)

## Troubleshooting

### Issue: Volume mount fails with "no such file or directory"

**Solution**: Ensure the directory exists on the manager node and NFS is properly configured.

```bash
# On manager node
sudo mkdir -p /var/lib/sparix/shared-storage
sudo chmod 777 /var/lib/sparix/shared-storage
sudo exportfs -ra
```

### Issue: "Connection refused" or "RPC timeout"

**Solution**: Check firewall rules and NFS service status.

```bash
# On manager node - check NFS service
sudo systemctl status nfs-kernel-server

# Check firewall (if enabled)
sudo ufw status
sudo ufw allow 111/tcp
sudo ufw allow 111/udp
sudo ufw allow 2049/tcp
sudo ufw allow 2049/udp

# Test connectivity from worker
# On worker node
telnet <MANAGER_IP> 2049
```

### Issue: "Permission denied" when accessing files

**Solution**: Check NFS export permissions and directory ownership.

```bash
# On manager node
sudo chmod 777 /var/lib/sparix/shared-storage
sudo chown -R nobody:nogroup /var/lib/sparix/shared-storage  # Or appropriate user

# Verify export allows root access
cat /etc/exports | grep sparix
# Should include: no_root_squash
```

### Issue: Mount works but files don't sync across nodes

**Solution**: Verify all nodes are mounting from the same NFS server.

```bash
# On each node
mount | grep sparix
# Should show same manager IP on all nodes
```

### Issue: NFS_MANAGER_IP not set

**Solution**: Set the environment variable before deploying.

```bash
export NFS_MANAGER_IP=<your-manager-ip>
docker stack deploy -c build/compose/docker-compose.yml <stack-name>
```

### Issue: Worker node can't mount after reboot

**Solution**: Ensure `/etc/fstab` entry exists and is correct.

```bash
# On worker node
cat /etc/fstab | grep sparix
# If missing, add:
# <MANAGER_IP>:/var/lib/sparix/shared-storage /var/lib/sparix/shared-storage nfs4 defaults,noatime 0 0
```

## Performance Considerations

### NFS Performance Tips

1. **Network**: Use a fast, low-latency network between nodes (preferably same subnet)
2. **Buffer Sizes**: Adjust `rsize` and `wsize` based on your network:
   - Fast LAN: `rsize=131072,wsize=131072` (128KB)
   - Slower network: `rsize=8192,wsize=8192` (8KB, current setting)
3. **Caching**: Consider using `actimeo=3` for better caching
4. **Protocol**: NFSv4 is recommended over NFSv3 for better performance and security

### Monitoring

Monitor NFS performance:
```bash
# Check NFS statistics
nfsstat -c  # Client stats
nfsstat -s  # Server stats (on manager)

# Monitor network traffic
iftop -i <network-interface>
```

## Security Considerations

⚠️ **Important Security Notes:**

1. **Firewall**: Restrict NFS access to your Swarm nodes only
   ```bash
   # On manager node - restrict to specific IPs
   echo "/var/lib/sparix/shared-storage <WORKER_IP>(rw,sync,no_subtree_check,no_root_squash)" | sudo tee -a /etc/exports
   ```

2. **Permissions**: The current setup uses `chmod 777` for simplicity. For production:
   - Use proper user/group ownership
   - Set appropriate permissions (e.g., `755` or `750`)
   - Consider using NFS user mapping

3. **Network**: Use a private network for NFS traffic if possible

4. **Encryption**: For sensitive data, consider NFS over TLS or VPN

## Rollback to Bind Mounts

If you need to revert to bind mounts (node-local storage):

1. **Update docker-compose.yml**:
   ```yaml
   volumes:
     shared-storage:
       driver: local
       driver_opts:
         type: none
         o: bind
         device: ${SHARED_STORAGE_PATH:-/var/lib/sparix/shared-storage}
   ```

2. **Create directory on all nodes**:
   ```bash
   sudo mkdir -p /var/lib/sparix/shared-storage
   sudo chmod 777 /var/lib/sparix/shared-storage
   ```

3. **Redeploy stack**

## Additional Resources

- [Docker NFS Volume Driver Documentation](https://docs.docker.com/storage/volumes/#use-a-volume-driver)
- [NFS Server Configuration Guide](https://help.ubuntu.com/community/SettingUpNFSHowTo)
- [Docker Swarm Documentation](https://docs.docker.com/engine/swarm/)

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review Docker and NFS logs:
   ```bash
   # Docker logs
   docker service logs <service-name>
   
   # NFS server logs (manager)
   sudo journalctl -u nfs-kernel-server
   
   # System logs
   sudo dmesg | grep nfs
   ```

