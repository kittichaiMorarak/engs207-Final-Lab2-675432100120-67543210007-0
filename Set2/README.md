# Final Lab Set 2: Microservices Scale-Up + Cloud Deployment (Railway)


| ชื่อ       |   รหัส                 |
| -------- | --------------------  |
| นายกิตติชัย โมรารักษ์ | 67543210012-0 |
| นายฉัตรดนัย มณีนวล | 67543210007-0  |

---

# สถาปัตยกรรมของระบบ

ระบบประกอบด้วยหลายบริการที่สื่อสารผ่าน API Gateway

```
Client
   │
   ▼
Nginx API Gateway
   │
   ├── Auth Service
   ├── Task Service
   ├── User Service
   └── Log Service
          │
          ▼
   PostgreSQL Databases
   (Database-per-Service)
```

---

# เทคโนโลยีที่ใช้

Backend

* Node.js
* Express.js

Infrastructure

* Docker
* Docker Compose

Gateway

* Nginx API Gateway

Database

* PostgreSQL

Authentication

* JWT (JSON Web Token)

Cloud Platform

* Railway

---

# Microservices ภายในระบบ

## 1. Auth Service

ใช้สำหรับจัดการระบบการยืนยันตัวตนของผู้ใช้

Endpoints

```
POST /api/auth/login
POST /api/auth/register
```

คุณสมบัติ

* การเข้าสู่ระบบ (Login)
* การสมัครสมาชิก (Register)
* การสร้าง JWT Token
* การตรวจสอบรหัสผ่าน

Database

```
auth-db
```

---

## 2. Task Service

ใช้สำหรับจัดการข้อมูล Task ของระบบ

Endpoints

```
GET /api/tasks
POST /api/tasks
PUT /api/tasks/:id
DELETE /api/tasks/:id
```

คุณสมบัติ

* สร้าง Task
* แก้ไข Task
* ลบ Task
* แสดงรายการ Task

Database

```
task-db
```

---

## 3. User Service

ใช้สำหรับจัดการข้อมูลผู้ใช้

Endpoints

```
GET /api/users
GET /api/users/:id
PUT /api/users/:id
```

Database

```
user-db
```

---

## 4. Log Service

ใช้สำหรับบันทึกเหตุการณ์ต่าง ๆ ที่เกิดขึ้นในระบบ

Endpoints

```
GET /api/logs
GET /api/logs/stats
POST /api/logs/internal
```

Database

```
log-db
```

---

# API Gateway (Nginx)

ระบบใช้ **Nginx เป็น API Gateway** เพื่อจัดการการรับ request และส่งต่อไปยัง service ที่ถูกต้อง

หน้าที่ของ Gateway

* จัดการ Routing ของ Request
* จำกัดจำนวน Request (Rate Limiting)
* เพิ่ม Security Headers
* ป้องกันการเข้าถึง Internal Endpoint
* ส่ง Authorization Header ไปยัง Service

ตัวอย่าง Routing

```
/api/auth  → auth-service
/api/tasks → task-service
/api/users → user-service
/api/logs  → log-service
```

---

# โครงสร้างฐานข้อมูล

โปรเจคนี้ใช้แนวคิด **Database-per-Service**

| Service      | Database |
| ------------ | -------- |
| Auth Service | auth-db  |
| Task Service | task-db  |
| User Service | user-db  |
| Log Service  | log-db   |

ข้อดีของรูปแบบนี้

* แต่ละ service ทำงานได้อิสระ
* สามารถขยายระบบได้ง่าย
* ลดการพึ่งพากันของฐานข้อมูล

---

# การรันระบบบนเครื่อง (Local)

### 1. Clone โปรเจค

```
git clone <repository-url>
cd project-folder
```

### 2. เริ่มระบบด้วย Docker

```
docker compose up --build
```

### 3. ตรวจสอบ Container

```
docker compose ps
```

### 4. เข้าใช้งานระบบ

API Gateway

```
http://localhost
```

ตัวอย่าง Endpoint

```
http://localhost/api/logs/health
```

---

# การ Deploy บน Cloud (Railway)

โปรเจคนี้สามารถ deploy บน Railway ได้

ขั้นตอน

1. Push โค้ดขึ้น GitHub
2. เชื่อมต่อ Repository กับ Railway
3. Deploy Service
4. ตั้งค่า Environment Variables
5. ตรวจสอบ Health Check

ตัวอย่าง URL ของระบบ

```
https://your-project-name.railway.app
```

ตัวอย่าง API

```
https://your-project-name.railway.app/api/tasks
```

---

# Health Check

แต่ละ Service มี Endpoint สำหรับตรวจสอบสถานะ

ตัวอย่าง

```
/api/auth/health
/api/tasks/health
/api/users/health
/api/logs/health
```

---

# การทดสอบระบบ

ตัวอย่างการทดสอบ

```
# Register
curl -X POST https://[AUTH_URL]/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username":"testuser",
    "email":"testuser@example.com",
    "password":"123456"
  }'

# Login → เก็บ token
TOKEN=$(curl -s -X POST https://[AUTH_URL]/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email":"testuser@example.com",
    "password":"123456"
  }' | jq -r '.token')

# Auth Me
curl https://[AUTH_URL]/api/auth/me \
  -H "Authorization: Bearer $TOKEN"

# Get Profile
curl https://[USER_URL]/api/users/me \
  -H "Authorization: Bearer $TOKEN"

# Update Profile
curl -X PUT https://[USER_URL]/api/users/me \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "display_name":"Test User",
    "bio":"Hello from Set 2"
  }'

# Create Task
curl -X POST https://[TASK_URL]/api/tasks \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title":"My first cloud task",
    "description":"Deploy all services to Railway",
    "status":"TODO",
    "priority":"high"
  }'

# Get Tasks
curl https://[TASK_URL]/api/tasks \
  -H "Authorization: Bearer $TOKEN"

# Test 401
curl https://[TASK_URL]/api/tasks

# Test admin-only endpoint
ADMIN_TOKEN=$(curl -s -X POST https://[AUTH_URL]/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email":"admin@lab.local",
    "password":"adminpass"
  }' | jq -r '.token')

curl https://[USER_URL]/api/users \
  -H "Authorization: Bearer $ADMIN_TOKEN"

# ความปลอดภัยของระบบ

ระบบมีการป้องกันด้านความปลอดภัยดังนี้

* JWT Authentication
* Rate Limiting
* Security Headers
* การป้องกัน Internal Endpoint
* การแยก Service ออกจากกัน

---

# แนวทางพัฒนาต่อ

สามารถพัฒนาระบบเพิ่มเติมได้ เช่น

* Load Balancing สำหรับ Service
* ระบบ Monitoring
* ระบบ CI/CD
* Distributed Logging

---

# สรุป

โปรเจคนี้แสดงให้เห็นการออกแบบระบบด้วย **Microservices Architecture** ที่ใช้ **API Gateway** และ **Database-per-Service** เพื่อเพิ่มความสามารถในการขยายระบบและความยืดหยุ่นในการพัฒนา

ระบบสามารถรันได้ทั้งแบบ Local และ Deploy ขึ้น Cloud ด้วย Railway

---

| ชื่อ       |   รหัส                 |
| -------- | --------------------  |
| นายกิตติชัย โมรารักษ์ | 67543210012-0 |
| นายฉัตรดนัย มณีนวล | 67543210007-0  |

