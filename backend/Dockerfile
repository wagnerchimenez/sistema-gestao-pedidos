FROM node:20-alpine AS base

RUN apk add --no-cache python3 make g++

WORKDIR /app

COPY package*.json ./

# ---- Development (hot reload com nest start --watch) ----
FROM base AS development

RUN npm install --no-fund --no-audit

COPY . .

RUN mkdir -p /app/relatorios /app/data

EXPOSE 3001
EXPOSE 9229

CMD ["npm", "run", "start:dev"]

# ---- Builder (compila TypeScript para produção) ----
FROM base AS builder

RUN npm install --no-fund --no-audit

COPY . .
RUN npm run build

# ---- Runtime (imagem mínima de produção) ----
FROM node:20-alpine AS runtime

RUN apk add --no-cache python3 make g++

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev --no-fund --no-audit

COPY --from=builder /app/dist ./dist

RUN mkdir -p /app/relatorios /app/data

EXPOSE 3001

CMD ["node", "dist/main"]
