# 🔐 Task Board — Microservices Architecture

A production-ready Task Board application built with **Microservices Architecture**, featuring JWT authentication, HTTPS support, rate limiting, and comprehensive logging.

---

## 📋 Quick Start

```bash
docker compose up --build
```

Then open **https://localhost** and login with:
- Email: `alice@lab.local` | Password: `alice123`
- Email: `admin@lab.local` | Password: `adminpass`

---

## 📊 System Overview

**Key Components:**
- 🔐 **Nginx Gateway** — HTTPS, TLS termination, rate limiting, reverse proxy
- 🔑 **JWT Authentication** — Stateless token-based auth (1 hour expiry)
- 🗄️ **PostgreSQL** — Shared database for all services
- 📝 **Logging Service** — Centralized event logging
- 💻 **Frontend** — Modern dark theme SPA with task & log dashboards
- 🐳 **Docker Compose** — Service orchestration with health checks

---

## 🏗️ Architecture

```
┌──────────────────┐
│   Browser HTTPS  │
└────────┬─────────┘
         │ :443
         ▼
    ┌─────────────┐
    │ Nginx :80   │
    │ :443 / TLS  │
    └──────┬──────┘
           │
    ┌──────┼──────┬──────────┐
    │      │      │          │
    │   (HTTP)  (HTTP)    (HTTP)
    │      │      │          │
    ▼      ▼      ▼          ▼
 Frontend Auth  Task      Log
         :3001  :3002    :3003
            │    │         │
            └────┼─────────┘
                 │
                 ▼
          PostgreSQL :5432
```

---

## 👥 Seed Users

| Email | Password | Role |
|-------|----------|------|
| alice@lab.local | alice123 | member |
| bob@lab.local | bob456 | member |
| admin@lab.local | adminpass | admin |

---

## 📂 Project Structure

```
final-lab-set1/
├── auth-service/           # Login & JWT generation
├── task-service/           # Task CRUD
├── log-service/            # Centralized logging
├── frontend/               # Task board UI + logs dashboard
├── nginx/                  # API gateway + TLS
├── db/                     # Database schema & seed data
├── docker-compose.yml
├── .env                    # Configuration
└── README.md              # This file
```

---

## 📚 API Endpoints

### Authentication
```bash
POST /api/auth/login
POST /api/auth/register
GET /api/auth/verify
```

### Tasks (require JWT)
```bash
GET /api/tasks              # Get all tasks
POST /api/tasks             # Create task
PUT /api/tasks/:id          # Update task
DELETE /api/tasks/:id       # Delete task
```

### Users (require JWT)
```bash
GET /api/users/me           # Get own profile
GET /api/users              # List all (admin only)
```

### Logging
```bash
GET /api/logs               # Get logs (admin)
POST /api/logs/internal     # Internal logs (blocked externally)
```

---

## 🧪 API Testing Example

```bash
# 1. Login
TOKEN=$(curl -sk -X POST https://localhost/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@lab.local","password":"alice123"}' \
  | jq -r '.token')

# 2. Create task
curl -sk -X POST https://localhost/api/tasks \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"My Task","priority":"high"}'

# 3. Get all tasks
curl -sk -X GET https://localhost/api/tasks \
  -H "Authorization: Bearer $TOKEN" | jq
```

---

## 📝 Logging System

Events logged to PostgreSQL:
- **Auth Service**: Login attempts, JWT validation
- **Task Service**: Task CRUD operations
- **Log Service**: Stores events, serves to dashboard

View logs at **https://localhost** (access via nav) with filters by service, level, and time.

---

## 🔐 Security Features

✅ **HTTPS/TLS** — Nginx TLS termination
✅ **JWT Auth** — Stateless, token-based
✅ **Rate Limiting** — 5 login attempts/min per IP
✅ **RBAC** — Role-based access (member/admin)
✅ **Password Security** — bcrypt hashing
✅ **SQL Injection Prevention** — Parameterized queries
✅ **Internal Endpoints** — `/api/logs/internal` blocked externally

---

## 💻 Frontend Features

- ✅ Task management (create, read, update, delete)
- ✅ Status filters (TODO, In Progress, Done)
- ✅ Priority levels (Low, Medium, High)
- ✅ User management (admin only)
- ✅ Real-time log dashboard
- ✅ JWT token inspector
- ✅ Dark theme with WCAG AAA contrast
- ✅ Responsive mobile/desktop design

---

## ⚙️ Configuration (.env)

```bash
# Database
POSTGRES_DB=taskboard
POSTGRES_USER=admin
POSTGRES_PASSWORD=secret123        # ⚠️ Change in production!

# JWT
JWT_SECRET=super-secret-key-here   # ⚠️ Change in production!
JWT_EXPIRES=1h
```

---

## 🚨 Known Limitations

| Issue | Reason |
|-------|--------|
| Shared Database | All services use one DB (demo design) |
| Self-Signed SSL | For dev only (use Let's Encrypt in prod) |
| No Horizontal Scaling | Single instance |
| No Service Discovery | Hard-coded URLs |
| No Distributed Tracing | Basic logging only |
| No WebSockets | Uses polling |
| No API Cache | Every query hits database |

---

## 🔧 Troubleshooting

```bash
# View logs
docker compose logs <service-name>

# Rebuild
docker compose build --no-cache

# Reset DB
docker compose down -v
docker compose up

# SSL issues
bash scripts/gen-certs.sh
```

---

## 📈 Performance Notes

- Database: Single shared instance (consider read replicas for production)
- Sessions: JWT in localStorage (consider secure cookies)
- Updates: Polling-based (consider WebSockets for real-time)
- Caching: None implemented (add Redis for high traffic)

---

**Last Updated:** March 15, 2026 | **Version:** 1.0.0

🚀 **Get started:** `docker compose up --build` → Open https://localhost