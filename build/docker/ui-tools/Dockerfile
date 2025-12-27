# Production Dockerfile for ui/tools
FROM node:20-slim

# Install NGINX
RUN apt-get update && apt-get install -y nginx && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy the built UI files
COPY dist/apps/ui/tools ./

# Set up NGINX configuration
RUN rm /etc/nginx/sites-enabled/default
COPY build/docker/ui-tools/nginx.conf /etc/nginx/conf.d/default.conf

# Use an .env.docker file if it exists
COPY .env.docker /.env

# Expose the UI port
EXPOSE 3034

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]