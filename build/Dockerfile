
# Base image for all applications
FROM node:20-slim

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libnss3 \
    libxss1 \
    libasound2 \
    fonts-noto-color-emoji \
    build-essential \
    python3 \
    make \
    g++ \
    netcat-openbsd \
    --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

# Copy package.json and install dependencies
COPY package.json package-lock.json* ./
RUN npm install --force

# Copy all built applications from the dist directory
COPY dist/apps ./dist/apps

# Create libs directory structure for Prisma client generation
RUN mkdir -p libs/backend/database/src/lib

# Copy all Prisma schemas
COPY prisma-content ./prisma-content
COPY prisma-research ./prisma-research
COPY prisma-job ./prisma-job
COPY prisma-crm ./prisma-crm
COPY prisma-scraper ./prisma-scraper
COPY prisma-email ./prisma-email
COPY prisma ./prisma

# Generate all Prisma clients
RUN npx prisma generate --schema=prisma-job/schema
RUN npx prisma generate --schema=prisma-research/schema.prisma
RUN npx prisma generate --schema=prisma-crm/schema
RUN npx prisma generate --schema=prisma-scraper/schema.prisma
RUN npx prisma generate --schema=prisma-content/schema.prisma
RUN npx prisma generate --schema=prisma-email/schema.prisma
RUN npx prisma generate --schema=prisma/schema

# Install Playwright dependencies
RUN npx playwright install chromium firefox --with-deps

# Set environment variables
ENV NODE_ENV=production

# Copy .env file if it exists
COPY .env.docker /.env

# # Copy and set permissions for the wait-for-it script
# COPY build/compose/wait-for-it.sh /usr/local/bin/wait-for-it.sh
# RUN sed -i 's/\r$//g' /usr/local/bin/wait-for-it.sh
# RUN chmod +x /usr/local/bin/wait-for-it.sh

# Expose a default port (this will be overridden in docker-compose)
EXPOSE 3000

# The command to run the application will be specified in docker-compose.yml
# For example: CMD ["node", "dist/apps/api-gateway/main.js"]
