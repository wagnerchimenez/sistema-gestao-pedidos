FROM node:20-alpine AS builder

RUN apk add --no-cache python3 make g++

WORKDIR /app

COPY package*.json ./
RUN npm install --no-fund --no-audit

COPY . .
RUN npm run build

# ---- Runtime ----
FROM node:20-alpine AS runtime

RUN apk add --no-cache python3 make g++

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev --no-fund --no-audit

COPY --from=builder /app/dist ./dist

RUN mkdir -p /app/relatorios /app/data

EXPOSE 3001

CMD ["node", "dist/main"]
