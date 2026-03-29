# Multi-stage Dockerfile for WebFixeet (Next.js)
# Build: docker build -t webfixeet .
# Run:   docker run -p 3001:3001 webfixeet

# --- Stage 1: Install dependencies ---
FROM node:20-alpine AS deps
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --production=false

# --- Stage 2: Build the application ---
FROM node:20-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects anonymous telemetry — disable in CI/build
ENV NEXT_TELEMETRY_DISABLED=1

RUN mkdir -p /app/public
RUN npm run build

# --- Stage 3: Production runtime ---
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3001
ENV HOSTNAME=0.0.0.0

# Don't run as root
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy public dir and standalone output
RUN mkdir -p ./public
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3001

CMD ["node", "server.js"]
