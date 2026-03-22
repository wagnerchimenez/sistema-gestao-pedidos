# Sistema de Gestão de Pedidos

Projeto demonstrativo Full Stack Sênior cobrindo **todos** os requisitos da vaga:

| Requisito da vaga              | Cobertura no projeto |
|--------------------------------|---------------------|
| Node.js + TypeScript           | ✅ NestJS 10 + TS 5 |
| ReactJS + TypeScript           | ✅ React 18 + Vite + TS |
| DDD                            | ✅ Entidades, Value Objects, Eventos de domínio, Repositórios (ports) |
| Arquitetura Hexagonal          | ✅ domínio / aplicação / infraestrutura / apresentação |
| Filas assíncronas              | ✅ Bull + Redis (`fila-pedidos`, `fila-relatorios`) |
| Geração de Excel               | ✅ ExcelJS com estilos, totalizadores e download via stream |
| Dashboard                      | ✅ Estatísticas em tempo real + gráficos Recharts |
| PostgreSQL                     | ✅ TypeORM + schema sincronizado |
| SQLite                         | ✅ `better-sqlite3` para auditoria isolada |
| Docker                         | ✅ Multi-stage Dockerfile + Docker Compose |
| GitHub Actions                 | ✅ CI (lint + build) + CD (deploy ECS) |
| AWS ECS                        | ✅ Task definitions Fargate + workflow de deploy |
| Health check de infraestrutura | ✅ `GET /saude` via `@nestjs/terminus` (DB, Redis, Filas, Memória) |
| Hot reload para desenvolvimento| ✅ `docker-compose.dev.yml` com Vite HMR + `nest start --watch` |

---

## 🏗️ Arquitetura

### Hexagonal (Ports & Adapters)

```
src/modulos/<modulo>/
├── domínio/               ← Núcleo do negócio (zero dependências de frameworks)
│   ├── entidades/         ← Agregados com invariantes de negócio
│   ├── valor-objetos/     ← Value Objects imutáveis (ex: ItemPedidoVO)
│   ├── enums/             ← Enumerações do domínio
│   ├── eventos/           ← Eventos de domínio (PedidoCriado, StatusAlterado)
│   └── repositorios/      ← Interfaces (Ports) — sem dependência TypeORM
├── aplicação/             ← Casos de uso (orquestração pura)
│   ├── casos-de-uso/
│   └── dtos/
├── infraestrutura/        ← Adaptadores concretos
│   ├── persistencia/      ← TypeORM Schemas + Repositórios
│   └── filas/             ← Processadores Bull
└── apresentação/          ← Controllers HTTP (NestJS)
```

### Módulos

| Módulo       | Responsabilidade                                   |
|--------------|----------------------------------------------------|
| `pedidos`    | CRUD + processamento assíncrono via fila           |
| `relatorios` | Geração de Excel em background com status de job   |
| `dashboard`  | Estatísticas agregadas e indicadores de negócio    |
| `auditoria`  | Log imutável de eventos persistido em SQLite       |
| `saude`      | Health check de PostgreSQL, Redis, filas e memória |

---

## 🚀 Como Rodar

### Pré-requisitos
- Docker >= 24
- Docker Compose >= 2.20

### Produção

```bash
docker compose up --build
```

| Serviço         | URL                            |
|-----------------|--------------------------------|
| Frontend        | http://localhost:3000          |
| API REST        | http://localhost:3001          |
| Swagger         | http://localhost:3001/api      |
| Health check    | http://localhost:3001/saude    |

### Desenvolvimento com Hot Reload 🔥

```bash
docker compose -f docker-compose.yml -f docker-compose.dev.yml up --build
```

- **Backend**: `nest start --watch` — recompila e reinicia ao salvar qualquer arquivo em `./backend/src`
- **Frontend**: Vite HMR — atualiza o browser instantaneamente ao salvar em `./frontend/src`
- **Debug**: porta `9229` exposta para attach do VS Code / Chrome DevTools

#### Desenvolvimento local (sem Docker para backend/frontend)

```bash
# 1. Sobe apenas a infraestrutura (Postgres + Redis)
docker compose up postgres redis

# 2. Terminal 1 — Backend
cd backend
cp ../.env.example .env
npm install && npm run start:dev

# 3. Terminal 2 — Frontend
cd frontend && npm install && npm run dev
```

> Após instalar novos pacotes, reconstrua a imagem dev:
> `docker compose -f docker-compose.yml -f docker-compose.dev.yml up --build`

---

## 🔍 Endpoint de saúde (`GET /saude`)

Verifica em tempo real todos os serviços de infraestrutura:

```json
{
  "status": "ok",
  "info": {
    "postgres":         { "status": "up" },
    "sqlite-auditoria": { "status": "up" },
    "redis":            { "status": "up", "host": "localhost", "port": "6379" },
    "fila-pedidos":     { "status": "up", "aguardando": 0, "ativo": 1, "concluido": 42 },
    "fila-relatorios":  { "status": "up", "aguardando": 0, "ativo": 0, "concluido": 3 },
    "memoria-heap":     { "status": "up" }
  }
}
```

Usado como `healthCheck.command` na task definition do ECS Fargate.

---

## 🔄 Fluxo de CI/CD

```
push → main
  └── ci.yml
        ├── Backend: lint + build TypeScript
        ├── Frontend: tsc + vite build
        └── Docker: build & push (DockerHub + ECR)
              └── deploy-ecs.yml (disparado ao CI passar)
                    ├── Deploy Backend → ECS Fargate
                    └── Deploy Frontend → ECS Fargate
```

### Secrets necessários (GitHub → Settings → Secrets)

| Secret                  | Descrição                         |
|-------------------------|-----------------------------------|
| `DOCKERHUB_USERNAME`    | Usuário do Docker Hub             |
| `DOCKERHUB_TOKEN`       | Token de acesso do Docker Hub     |
| `AWS_ACCESS_KEY_ID`     | Chave de acesso AWS               |
| `AWS_SECRET_ACCESS_KEY` | Chave secreta AWS                 |
| `AWS_ECR_REGISTRY`      | URI do ECR (ex: `123.dkr.ecr...`) |
| `API_URL`               | URL pública da API (ECS ALB)      |

---

## 📡 Endpoints principais

### Pedidos
```
POST   /pedidos                    ← Criar pedido (enfileira processamento)
GET    /pedidos                    ← Listar todos os pedidos
GET    /pedidos/:id                ← Buscar pedido por ID
PATCH  /pedidos/:id/status         ← Atualizar status do pedido
```

### Relatórios
```
POST   /relatorios/gerar           ← Solicitar geração de Excel (assíncrono)
GET    /relatorios/:jobId/status   ← Verificar status do job
GET    /relatorios/:jobId/download ← Baixar Excel gerado
```

### Dashboard
```
GET    /dashboard/estatisticas     ← Estatísticas gerais
```

### Saúde
```
GET    /saude                      ← Status de PostgreSQL, Redis, Filas e Memória
```

---

## 🗄️ Bancos de Dados

- **PostgreSQL**: dados operacionais (pedidos, itens)
- **SQLite**: logs de auditoria locais

---

## ⚙️ Variáveis de Ambiente

Copie `.env.example` para `.env` no diretório `backend/`:

```bash
cp backend/.env.example backend/.env
```
