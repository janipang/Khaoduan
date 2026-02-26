FROM node:20-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]

# docker network create khaoduan-net


# docker build -t khaoduan-fe-image . 
# docker container rm -f khaoduan-web
# docker run -d --name khaoduan-web --network khaoduan-net -p 3000:3000 -e NEXT_PUBLIC_API_URL=http://khaoduan-api:8080 -e API_LOCAL_HOST=http://localhost:8080 khaoduan-fe-image

# docker build -t khaoduan-api . 
# docker container rm -f khaoduan-api
# docker run -d --name khaoduan-api --network khaoduan-net -p 8080:8080 -v D:/Code/Project/Web/khaoduan-api/Storage:/app/storage khaoduan-api

