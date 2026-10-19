# ===================================================
# Multi-Stage Production Dockerfile for Coolify Deploy
# ===================================================

# Stage 1: Build Frontend Assets
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies with cache optimization
COPY package*.json ./
RUN npm install

# Copy application source files
COPY . .

# Build Vite production bundle
RUN npm run build

# Stage 2: Production Nginx Server
FROM nginx:1.27-alpine-slim AS runner

# Remove default static files
RUN rm -rf /usr/share/nginx/html/* /etc/nginx/conf.d/default.conf

# Copy custom Nginx configuration for SPA routing & caching
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy compiled assets from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose standard web port
EXPOSE 80

# Health check monitoring for Coolify
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://127.0.0.1/healthz || exit 1

CMD ["nginx", "-g", "daemon off;"]
