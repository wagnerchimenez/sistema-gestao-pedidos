# Sistema de Gestão de Pedidos

Projeto demonstrativo de arquitetura Full Stack Sênior, cobrindo os requisitos:

- **NestJS + TypeScript** com **DDD e Arquitetura Hexagonal**
- **Filas assíncronas** com BullMQ + Redis
- **Geração de Excel** com ExcelJS
- **Dashboard** com estatísticas em tempo real
- **PostgreSQL** como banco principal
- **SQLite** para auditoria local
- **Docker + Docker Compose** para orquestração

---

## 🏗️ Arquitetura

### Hexagonal (Ports & Adapters)

```
src/modulos/<modulo>/
├── dominio/               ← Núcleo do negócio (sem dependências externas)
│   ├── entidades/         ← Entidades e Agregados
│   ├── valor-objetos/     ← Value Objects imutáveis
│   ├── enums/             ← Enumerações do domínio
│   ├── eventos/           ← Eventos de domínio
│   └── repositorios/      ← Interfaces (Ports) dos repositórios
├── aplicacao/             ← Casos de uso (orquestração)
│   ├── casos-de-uso/      ← Lógica de aplicação
│   └── dtos/              ← Objetos de transferência de dados
├── infraestrutura/        ← Adaptadores (implementações concretas)
│   ├── persistencia/      ← Repositórios TypeORM
│   └── filas/             ← Produtores/Consumidores de fila
└── apresentacao/          ← Controladores HTTP
```

### Módulos

| Módulo       | Responsabilidade                            |
|--------------|---------------------------------------------|
| `pedidos`    | CRUD de pedidos, processamento via fila     |
| `relatorios` | Geração assíncrona de Excel                 |
| `dashboard`  | Estatísticas e indicadores de negócio        |
| `auditoria`  | Log de auditoria persistido em SQLite        |

---

## 🚀 Como Rodar

### Pré-requisitos
- Docker >= 24
- Docker Compose >= 2.20

### Subir o ambiente completo
```bash
docker compose up --build
```

### Acessar
| Serviço   | URL                       |
|-----------|---------------------------|
| Frontend  | http://localhost:3000      |
| API REST  | http://localhost:3001      |
| Swagger   | http://localhost:3001/api  |

---

## 📡 Endpoints principais

### Pedidos
```
POST   /pedidos              ← Criar pedido (enfileira processamento)
GET    /pedidos              ← Listar todos os pedidos
GET    /pedidos/:id          ← Buscar pedido por ID
PATCH  /pedidos/:id/status   ← Atualizar status do pedido
```

### Relatórios
```
POST   /relatorios/gerar     ← Solicitar geração de Excel (assíncrono)
GET    /relatorios/:jobId    ← Verificar status do job
GET    /relatorios/:jobId/download ← Baixar Excel gerado
```

### Dashboard
```
GET    /dashboard/estatisticas ← Estatísticas gerais
```

---

## 🗄️ Bancos de Dados

- **PostgreSQL**: dados operacionais (pedidos, itens)
- **SQLite**: logs de auditoria locais (criação/atualização de pedidos)
- **BigQuery** *(preparado via porta de integração)*: analytics avançado — a arquitetura hexagonal permite plugar o adaptador sem alterar o domínio

---

## ⚙️ Variáveis de Ambiente

Copie `.env.example` para `.env` no diretório `backend/`:

```bash
cp backend/.env.example backend/.env
```
