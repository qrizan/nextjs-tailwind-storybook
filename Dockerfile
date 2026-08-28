########################################
# Stage: deps — install dependencies
########################################
FROM node:25-alpine@sha256:bdf2cca6fe3dabd014ea60163eca3f0f7015fbd5c7ee1b0e9ccb4ced6eb02ef4 AS deps

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

########################################
# Stage: builder — build with Next.js standalone output
########################################
FROM node:25-alpine@sha256:bdf2cca6fe3dabd014ea60163eca3f0f7015fbd5c7ee1b0e9ccb4ced6eb02ef4 AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# NEXT_PUBLIC_* vars are inlined into the build (client AND server bundles)
# at build time — must be a build ARG, not a runtime container env var.
ARG NEXT_PUBLIC_API_BACKEND=http://localhost:8000
ENV NEXT_PUBLIC_API_BACKEND=$NEXT_PUBLIC_API_BACKEND
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# next.config.mjs excludes these paths from output file tracing, but that
# only reduced them (tar, giget), it did not fully catch @esbuild/linux-x64:
# Next.js's tracer still leaks some optional platform binaries from
# devDependency-only build tooling (Storybook) into .next/standalone. None of
# this is reachable at runtime, so remove it deterministically instead of
# accepting the CVEs baked into that binary's outdated bundled Go stdlib.
RUN rm -rf \
    .next/standalone/node_modules/@esbuild \
    .next/standalone/node_modules/esbuild \
    .next/standalone/node_modules/tar \
    .next/standalone/node_modules/giget \
    .next/standalone/node_modules/@storybook

########################################
# Stage: runner — minimal production runtime (standalone output)
########################################
FROM node:25-alpine@sha256:bdf2cca6fe3dabd014ea60163eca3f0f7015fbd5c7ee1b0e9ccb4ced6eb02ef4 AS runner

# This stage only ever runs `node server.js`, never npm. The base image's own
# global npm install bundles its own internal tar dependency (unrelated to
# anything in package-lock.json here) that carries CVE-2026-59873 in this
# node:20-alpine digest. Removing npm entirely removes that CVE along with a
# tool that has no reason to be in a production runtime image.
RUN rm -rf /usr/local/lib/node_modules/npm /usr/local/bin/npm /usr/local/bin/npx

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
