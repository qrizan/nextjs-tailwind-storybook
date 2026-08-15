########################################
# Stage: deps — install dependencies
########################################
FROM node:20-alpine AS deps

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

########################################
# Stage: builder — build with Next.js standalone output
########################################
FROM node:20-alpine AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# NEXT_PUBLIC_* vars are inlined into the build (client AND server bundles)
# at build time — must be a build ARG, not a runtime container env var.
ARG NEXT_PUBLIC_API_BACKEND=http://localhost:8000
ENV NEXT_PUBLIC_API_BACKEND=$NEXT_PUBLIC_API_BACKEND
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

########################################
# Stage: runner — minimal production runtime (standalone output)
########################################
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=builder /app/public ./public
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static

USER node

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

CMD ["node", "server.js"]
