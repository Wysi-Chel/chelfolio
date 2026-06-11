# Use Node 20 for a stable production build
FROM node:20-alpine AS builder
WORKDIR /usr/src/app

# Install dependencies and build
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Runtime image
FROM node:20-alpine AS runner
WORKDIR /usr/src/app
ENV NODE_ENV=production

COPY package.json package-lock.json ./
RUN npm ci --production

COPY --from=builder /usr/src/app/.next .next
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/next.config.mjs ./next.config.mjs

EXPOSE 3000
CMD ["npm", "start"]
