# ENGSE207 Software Architecture
# Final Lab — ชุดที่ 2: Microservices Scale-Up + Cloud Deployment (Railway)

> **งานสอบปฏิบัติแบบกลุ่ม (2 คนต่อกลุ่ม) | ระยะเวลาสอบ 6 ชั่วโมง | คะแนนเต็ม 100 คะแนน**
>
> นักศึกษาสามารถนำโค้ดจาก **Final Lab Set 1**, **Week 6**, **Week 7** และ **Week 12** มาประยุกต์ใช้ได้ตามความเหมาะสม
>
> **ให้ส่งงานผ่าน Git Repository เท่านั้น**

---

## สารบัญ

- [ENGSE207 Software Architecture](#engse207-software-architecture)
- [Final Lab — ชุดที่ 2: Microservices Scale-Up + Cloud Deployment (Railway)](#final-lab--ชุดที่-2-microservices-scale-up--cloud-deployment-railway)
  - [สารบัญ](#สารบัญ)
  - [1. ภาพรวมและวัตถุประสงค์](#1-ภาพรวมและวัตถุประสงค์)
    - [การแบ่งเวลาโดยประมาณ (6 ชั่วโมง)](#การแบ่งเวลาโดยประมาณ-6-ชั่วโมง)
    - [วัตถุประสงค์การเรียนรู้](#วัตถุประสงค์การเรียนรู้)
  - [2. ขอบเขตของ Set 2 และความต่อเนื่องจาก Set 1](#2-ขอบเขตของ-set-2-และความต่อเนื่องจาก-set-1)
    - [สิ่งที่ต้องพัฒนาเพิ่มจาก Set 1](#สิ่งที่ต้องพัฒนาเพิ่มจาก-set-1)
    - [ความสามารถที่ระบบควรรองรับ](#ความสามารถที่ระบบควรรองรับ)
    - [หมายเหตุสำคัญ](#หมายเหตุสำคัญ)
  - [3. Phase 1: ปรับสถาปัตยกรรมให้ทำงานบน Local](#3-phase-1-ปรับสถาปัตยกรรมให้ทำงานบน-local)
    - [3.1 Services](#31-services)
    - [3.2 Databases](#32-databases)
    - [3.3 แนวคิดการเชื่อมโยงข้อมูลระหว่างบริการ](#33-แนวคิดการเชื่อมโยงข้อมูลระหว่างบริการ)
    - [3.4 JWT Payload ที่ทุก Service ต้องใช้ร่วมกัน](#34-jwt-payload-ที่ทุก-service-ต้องใช้ร่วมกัน)
    - [3.5 User Service — Endpoints ที่ต้องมี](#35-user-service--endpoints-ที่ต้องมี)
    - [3.6 DB Schema สำหรับ Set 2](#36-db-schema-สำหรับ-set-2)
    - [3.7 โครงสร้าง Repository ที่แนะนำ](#37-โครงสร้าง-repository-ที่แนะนำ)
    - [3.8 docker-compose.yml สำหรับการทดสอบ Local](#38-docker-composeyml-สำหรับการทดสอบ-local)
    - [3.9 สิ่งที่ต้องตรวจสอบบน Local ก่อนขึ้น Cloud](#39-สิ่งที่ต้องตรวจสอบบน-local-ก่อนขึ้น-cloud)
  - [4. Phase 2: Deploy Auth Service บน Railway](#4-phase-2-deploy-auth-service-บน-railway)
  - [5. Phase 3: Deploy Task Service บน Railway](#5-phase-3-deploy-task-service-บน-railway)
  - [6. Phase 4: Deploy User Service บน Railway](#6-phase-4-deploy-user-service-บน-railway)
  - [7. Phase 5: Gateway Strategy](#7-phase-5-gateway-strategy)
    - [ข้อกำหนดสำหรับทุก Gateway Option](#ข้อกำหนดสำหรับทุก-gateway-option)
    - [แนวทางที่แนะนำ](#แนวทางที่แนะนำ)
  - [ตัวเลือกเสริมด้าน Non-Functional Requirement: Availability via Load Balancing](#ตัวเลือกเสริมด้าน-non-functional-requirement-availability-via-load-balancing)
    - [แนวทางที่แนะนำ](#แนวทางที่แนะนำ-1)
    - [ขอบเขตของงานเสริมนี้](#ขอบเขตของงานเสริมนี้)
    - [สิ่งที่ต้องอธิบายใน README หากเลือกทำ](#สิ่งที่ต้องอธิบายใน-readme-หากเลือกทำ)
  - [8. Phase 6: Test Cases และ Screenshots](#8-phase-6-test-cases-และ-screenshots)
    - [Test Cases](#test-cases)
    - [Bonus Test Cases — Availability via Load Balancing](#bonus-test-cases--availability-via-load-balancing)
    - [โครงสร้างโฟลเดอร์ screenshots/](#โครงสร้างโฟลเดอร์-screenshots)
    - [Bonus Screenshots สำหรับกลุ่มที่ทำ Load Balancing](#bonus-screenshots-สำหรับกลุ่มที่ทำ-load-balancing)
  - [9. วิธีการส่งงาน](#9-วิธีการส่งงาน)
    - [Git Repository](#git-repository)
    - [ไฟล์บังคับที่ต้องมี](#ไฟล์บังคับที่ต้องมี)
    - [README.md สำหรับ Set 2 ต้องมี](#readmemd-สำหรับ-set-2-ต้องมี)
    - [เพิ่มเติมสำหรับกลุ่มที่ทำ Bonus ด้าน Availability](#เพิ่มเติมสำหรับกลุ่มที่ทำ-bonus-ด้าน-availability)
    - [หัวข้อแนะนำใน README สำหรับ Bonus Availability](#หัวข้อแนะนำใน-readme-สำหรับ-bonus-availability)
      - [Availability Scenario](#availability-scenario)
      - [Load Balancing Design](#load-balancing-design)
      - [Evidence of Distribution](#evidence-of-distribution)
      - [Degraded Operation / Failover Result](#degraded-operation--failover-result)
      - [Trade-offs](#trade-offs)
    - [TEAM\_SPLIT.md](#team_splitmd)
    - [INDIVIDUAL\_REPORT\_\[studentid\].md](#individual_report_studentidmd)
    - [ตัวอย่าง curl สำหรับทดสอบบน Cloud](#ตัวอย่าง-curl-สำหรับทดสอบบน-cloud)
  - [10. การประเมินรายกลุ่มและรายบุคคล](#10-การประเมินรายกลุ่มและรายบุคคล)
    - [สัดส่วนคะแนนที่ใช้จริง](#สัดส่วนคะแนนที่ใช้จริง)
    - [แนวทางการสัมภาษณ์รายบุคคล](#แนวทางการสัมภาษณ์รายบุคคล)
    - [หมายเหตุ](#หมายเหตุ)
  - [หมายเหตุสำหรับงานเสริม (Bonus)](#หมายเหตุสำหรับงานเสริม-bonus)

---

## 1. ภาพรวมและวัตถุประสงค์

Final Lab ชุดที่ 2 เป็นการต่อยอดจาก Set 1 โดยขยายระบบจาก **2 Services เป็น 3 Services** และเปลี่ยนรูปแบบการจัดเก็บข้อมูลจากฐานข้อมูลร่วมกัน ไปเป็น **Database-per-Service Pattern** จากนั้นให้นำระบบขึ้นใช้งานบน **Railway Cloud**

ใน Set 2 นักศึกษาต้องพัฒนา **Register API** เพิ่มใน `Auth Service` โดยอ้างอิงแนวคิดจาก week12-jwt-microservices แต่ต้อง **คง data model หลักจาก Set 1 ไว้** เพื่อให้พัฒนาต่อเนื่องได้อย่างเหมาะสม ดังนี้

- ตาราง `users` ใน `auth-db` ใช้ `id SERIAL PRIMARY KEY`
- JWT ใช้ `sub = user.id`
- ตารางใน `task-db` และ `user-db` อ้างอิงผู้ใช้ด้วย `user_id INTEGER`
- ไม่เปลี่ยนไปใช้ `user_id` แบบ string เช่น `user-001`

### การแบ่งเวลาโดยประมาณ (6 ชั่วโมง)

| Phase | งาน | เวลา |
|---|---|---:|
| Phase 1 | ปรับ Architecture, เพิ่ม Register, เพิ่ม User Service, ทดสอบ Local | 90 นาที |
| Phase 2 | Deploy Auth Service + auth-db บน Railway | 50 นาที |
| Phase 3 | Deploy Task Service + task-db บน Railway | 45 นาที |
| Phase 4 | Deploy User Service + user-db บน Railway | 45 นาที |
| Phase 5 | ตั้งค่า Gateway Strategy และทดสอบ End-to-End | 60 นาที |
| Phase 6 | จัดทำ README, TEAM_SPLIT, INDIVIDUAL_REPORT, Screenshots และ Push Repo | 70 นาที |

### วัตถุประสงค์การเรียนรู้

| วัตถุประสงค์ | CLO |
|---|---|
| ออกแบบระบบแบบ Database-per-Service ได้ | CLO3, CLO6 |
| ขยายระบบเดิมโดยเพิ่ม Register API และ User Service ได้ | CLO6 |
| Deploy 3 services และ 3 databases บน Railway ได้ | CLO7, CLO14 |
| เลือกและอธิบาย Gateway Strategy สำหรับ Cloud Services ได้ | CLO6, CLO7 |
| ทดสอบระบบแบบ end-to-end บน Cloud ได้ | CLO14 |

---

## 2. ขอบเขตของ Set 2 และความต่อเนื่องจาก Set 1

Set 2 เป็นงานสอบจริงที่ต่อยอดจาก Set 1 โดยตรง นักศึกษาควรเริ่มจาก codebase ที่ได้จัดโครงสร้างไว้แล้วจาก Set 1 และพัฒนาต่อ ไม่ควรเริ่มต้นใหม่ทั้งหมด เว้นแต่มีเหตุผลที่สมควรและสามารถอธิบายได้

### สิ่งที่ต้องพัฒนาเพิ่มจาก Set 1
1. เพิ่ม `Register API` ใน `Auth Service`
2. เพิ่ม `User Service` สำหรับจัดการข้อมูลโปรไฟล์ผู้ใช้
3. แยกฐานข้อมูลออกเป็น 3 ชุด
   - `auth-db`
   - `task-db`
   - `user-db`
4. ใช้ `JWT_SECRET` ค่าเดียวกันทุก service
5. Deploy ขึ้น Railway และทดสอบระบบแบบ end-to-end บน Cloud

### ความสามารถที่ระบบควรรองรับ
- สมัครสมาชิกใหม่ผ่าน `Register API`
- เข้าสู่ระบบและรับ JWT
- ดูและแก้ไขโปรไฟล์ของตนเอง
- สร้าง แก้ไข ลบ และดูรายการงานของตนเอง
- ผู้ดูแลระบบ (`admin`) สามารถดูรายการผู้ใช้ทั้งหมดได้

### หมายเหตุสำคัญ
แม้ Set 2 จะอ้างอิงแนวคิดจาก week12-jwt-microservices แต่ในงานสอบชุดนี้ให้คง data model หลักของ Set 1 ไว้ เพื่อให้พัฒนาต่อเนื่องได้ง่ายและลดการ refactor ที่ไม่จำเป็น

ดังนั้น:
- ใช้ `users.id` แบบ `SERIAL`
- JWT ใช้ `sub = user.id`
- ใช้ `user_id INTEGER` ใน `task-db` และ `user-db`
- ไม่เปลี่ยนเป็น `user_id` แบบ string

---

## 3. Phase 1: ปรับสถาปัตยกรรมให้ทำงานบน Local

ก่อน Deploy ขึ้น Cloud นักศึกษาต้องทำให้ระบบทำงานบน local ได้ก่อนอย่างน้อยในระดับ API ให้ครบถ้วน

```text
Internet / Browser / Postman
    │
    ▼
┌──────────────────────────────────────────────────────────────────────────┐
│   Local Docker / Railway Cloud                                           │
│                                                                          │
│  ┌───────────────────┐  ┌──────────────────────┐  ┌───────────────────┐  │
│  │  🔑 Auth Service  │  │  📋 Task Service     │  │  👤 User Service  │  │
│  │  PORT: 3001       │  │  PORT: 3002          │  │  PORT: 3003       │  │
│  └────────┬──────────┘  └──────────┬───────────┘  └────────┬──────────┘  │
│           │                        │                       │             │
│           ▼                        ▼                       ▼             │
│  ┌────────────────┐   ┌─────────────────────┐  ┌──────────────────────┐  │
│  │  🗄️ auth-db    │   │  🗄️ task-db         │  │  🗄️ user-db          │  │
│  │  users table   │   │  tasks table        │  │  user_profiles table │  │
│  │  logs table    │   │  logs table         │  │  logs table          │  │
│  └────────────────┘   └─────────────────────┘  └──────────────────────┘  │
│                                                                          │
│  JWT_SECRET ใช้ร่วมกันทุก service                                            │
└──────────────────────────────────────────────────────────────────────────┘
```

### 3.1 Services
- **Auth Service**
  - สมัครสมาชิก (`register`)
  - เข้าสู่ระบบ (`login`)
  - ตรวจสอบ token (`verify` / `me`)
  - ออก JWT ให้ผู้ใช้

- **Task Service**
  - จัดการงานของผู้ใช้
  - ทุก endpoint ต้องใช้ JWT
  - อ่าน `user_id` จาก JWT เพื่อคัดกรองข้อมูลของผู้ใช้แต่ละคน

- **User Service**
  - จัดการข้อมูลโปรไฟล์ผู้ใช้
  - ทุก endpoint ต้องใช้ JWT
  - รองรับการดูและแก้ไขโปรไฟล์
  - รองรับการดูรายชื่อผู้ใช้ทั้งหมดสำหรับ `admin`

### 3.2 Databases
- **auth-db**
  - ตาราง `users`
  - เก็บ `username`, `email`, `password_hash`, `role`

- **task-db**
  - ตาราง `tasks`
  - เก็บ `user_id`, `title`, `description`, `status`, `priority`

- **user-db**
  - ตาราง `user_profiles`
  - เก็บ `user_id`, `username`, `email`, `role`, `display_name`, `bio`, `avatar_url`

### 3.3 แนวคิดการเชื่อมโยงข้อมูลระหว่างบริการ
ใน Set 2 จะไม่มี Foreign Key ข้ามฐานข้อมูล ดังนั้น `user_id` ใน `task-db` และ `user-db` ให้ถือเป็น **logical reference** ไปยัง `auth-db.users.id`

ตัวอย่าง:
- `auth-db.users.id = 1`
- `task-db.tasks.user_id = 1`
- `user-db.user_profiles.user_id = 1`

### 3.4 JWT Payload ที่ทุก Service ต้องใช้ร่วมกัน

```json
{
  "sub": 1,
  "email": "alice@lab.local",
  "username": "alice",
  "role": "member"
}
```

Service อื่น ๆ ต้อง verify token โดยใช้ `JWT_SECRET` ค่าเดียวกัน

### 3.5 User Service — Endpoints ที่ต้องมี

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/api/users/me` | ดู profile ของตนเอง | ✅ JWT |
| PUT | `/api/users/me` | แก้ไข profile ของตนเอง | ✅ JWT |
| GET | `/api/users` | ดูรายชื่อผู้ใช้ทั้งหมด | ✅ JWT + Admin only |
| GET | `/api/users/health` | ตรวจสอบสถานะ service | ไม่ต้องมี JWT |

> **หมายเหตุ:** ไม่บังคับ `DELETE /api/users/:id` ใน Set 2 เนื่องจากเป็นระบบแบบ database-per-service และการลบผู้ใช้ข้ามหลายฐานข้อมูลมีความซับซ้อนเกินขอบเขตของงานสอบ

### 3.6 DB Schema สำหรับ Set 2

**auth-db** — เก็บข้อมูล authentication และ register/login

```sql
CREATE TABLE IF NOT EXISTS users (
  id            SERIAL PRIMARY KEY,
  username      VARCHAR(50) UNIQUE NOT NULL,
  email         VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role          VARCHAR(20) DEFAULT 'member',
  created_at    TIMESTAMP DEFAULT NOW(),
  last_login    TIMESTAMP
);

CREATE TABLE IF NOT EXISTS logs (
  id         SERIAL PRIMARY KEY,
  level      VARCHAR(10)  NOT NULL,
  event      VARCHAR(100) NOT NULL,
  user_id    INTEGER,
  message    TEXT,
  meta       JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);
```

**task-db** — เก็บ tasks เท่านั้น

```sql
CREATE TABLE IF NOT EXISTS tasks (
  id          SERIAL PRIMARY KEY,
  user_id     INTEGER NOT NULL,
  title       VARCHAR(200) NOT NULL,
  description TEXT,
  status      VARCHAR(20) DEFAULT 'TODO',
  priority    VARCHAR(10) DEFAULT 'medium',
  created_at  TIMESTAMP DEFAULT NOW(),
  updated_at  TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS logs (
  id         SERIAL PRIMARY KEY,
  level      VARCHAR(10)  NOT NULL,
  event      VARCHAR(100) NOT NULL,
  user_id    INTEGER,
  message    TEXT,
  meta       JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);
```

**user-db** — เก็บข้อมูลโปรไฟล์ผู้ใช้

```sql
CREATE TABLE IF NOT EXISTS user_profiles (
  id           SERIAL PRIMARY KEY,
  user_id      INTEGER UNIQUE NOT NULL,
  username     VARCHAR(50),
  email        VARCHAR(100),
  role         VARCHAR(20) DEFAULT 'member',
  display_name VARCHAR(100),
  bio          TEXT,
  avatar_url   VARCHAR(255),
  updated_at   TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS logs (
  id         SERIAL PRIMARY KEY,
  level      VARCHAR(10)  NOT NULL,
  event      VARCHAR(100) NOT NULL,
  user_id    INTEGER,
  message    TEXT,
  meta       JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);
```

> **หมายเหตุสำคัญ:** หากผู้ใช้สมัครใหม่ผ่าน `POST /api/auth/register` แล้ว login สำเร็จ แต่ยังไม่มีข้อมูลใน `user_profiles` ให้ `User Service` สร้าง profile เริ่มต้นให้อัตโนมัติเมื่อเรียก `GET /api/users/me` ครั้งแรก โดยใช้ข้อมูลจาก JWT เช่น `sub`, `username`, `email`, `role`

### 3.7 โครงสร้าง Repository ที่แนะนำ

```text
engse207-final-lab2-[student1]-[student2]/
├── README.md
├── TEAM_SPLIT.md
├── INDIVIDUAL_REPORT_[studentid].md
├── docker-compose.yml
├── .env.example
├── auth-service/
│   ├── Dockerfile
│   ├── package.json
│   ├── init.sql
│   └── src/
│       ├── index.js
│       ├── db/db.js
│       ├── middleware/jwtUtils.js
│       └── routes/auth.js
├── task-service/
│   ├── Dockerfile
│   ├── package.json
│   ├── init.sql
│   └── src/
│       ├── index.js
│       ├── db/db.js
│       ├── middleware/authMiddleware.js
│       ├── middleware/jwtUtils.js
│       └── routes/tasks.js
├── user-service/
│   ├── Dockerfile
│   ├── package.json
│   ├── init.sql
│   └── src/
│       ├── index.js
│       ├── db/db.js
│       ├── middleware/authMiddleware.js
│       ├── middleware/jwtUtils.js
│       └── routes/users.js
├── frontend/
│   ├── index.html
│   ├── profile.html
│   ├── config.js
│   └── Dockerfile
└── screenshots/
```

### 3.8 docker-compose.yml สำหรับการทดสอบ Local

ก่อน deploy ขึ้น Cloud ให้ทดสอบด้วย docker-compose ที่มีอย่างน้อย **3 services + 3 databases**

```yaml
services:
  auth-db:
    image: postgres:15
    environment:
      POSTGRES_DB: authdb
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: secret
    ports:
      - "5433:5432"
    volumes:
      - ./auth-service/init.sql:/docker-entrypoint-initdb.d/init.sql

  task-db:
    image: postgres:15
    environment:
      POSTGRES_DB: taskdb
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: secret
    ports:
      - "5434:5432"
    volumes:
      - ./task-service/init.sql:/docker-entrypoint-initdb.d/init.sql

  user-db:
    image: postgres:15
    environment:
      POSTGRES_DB: userdb
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: secret
    ports:
      - "5435:5432"
    volumes:
      - ./user-service/init.sql:/docker-entrypoint-initdb.d/init.sql

  auth-service:
    build: ./auth-service
    environment:
      DATABASE_URL: postgres://admin:secret@auth-db:5432/authdb
      JWT_SECRET: dev-shared-secret
      JWT_EXPIRES_IN: 1h
      PORT: 3001
      NODE_ENV: development
    ports:
      - "3001:3001"
    depends_on:
      - auth-db

  task-service:
    build: ./task-service
    environment:
      DATABASE_URL: postgres://admin:secret@task-db:5432/taskdb
      JWT_SECRET: dev-shared-secret
      PORT: 3002
      NODE_ENV: development
    ports:
      - "3002:3002"
    depends_on:
      - task-db

  user-service:
    build: ./user-service
    environment:
      DATABASE_URL: postgres://admin:secret@user-db:5432/userdb
      JWT_SECRET: dev-shared-secret
      PORT: 3003
      NODE_ENV: development
    ports:
      - "3003:3003"
    depends_on:
      - user-db
```

### 3.9 สิ่งที่ต้องตรวจสอบบน Local ก่อนขึ้น Cloud

1. `POST /api/auth/register` สมัครสมาชิกใหม่ได้
2. `POST /api/auth/login` ได้ JWT
3. `GET /api/auth/me` ได้ข้อมูลผู้ใช้
4. `GET /api/users/me` ได้ profile
5. `PUT /api/users/me` อัปเดต profile ได้
6. `POST /api/tasks` ทำงานได้
7. `GET /api/tasks` ทำงานได้
8. ทุก service เชื่อมต่อ database ของตนเองได้

> **หมายเหตุ:** ใน local สามารถใช้ `init.sql` ผ่าน Docker ได้ แต่บน Railway อาจไม่รัน `init.sql` แบบเดียวกับ local เสมอไป นักศึกษาควรเตรียม `initDB()` ใน service หรือมี SQL script สำหรับ import schema แยกไว้

---

## 4. Phase 2: Deploy Auth Service บน Railway

1. ไปที่ Railway → **New Project** → **Deploy from GitHub**
2. เลือก repository และกำหนด **Root Directory** = `auth-service`
3. เพิ่ม **PostgreSQL Plugin** และตั้งชื่อ `auth-db`
4. ตั้งค่า **Environment Variables** ดังนี้

```env
DATABASE_URL=${{auth-db.DATABASE_URL}}
JWT_SECRET=your-shared-jwt-secret-here
JWT_EXPIRES_IN=1h
PORT=3001
NODE_ENV=production
```

5. Deploy และตรวจสอบ Deploy Logs
6. ทดสอบ endpoint อย่างน้อย:
   - `POST /api/auth/register`
   - `POST /api/auth/login`
   - `GET /api/auth/me`
   - `GET /api/auth/health`
7. บันทึก Auth Service URL เพื่อใช้ทดสอบ End-to-End

> **หมายเหตุ:** ชื่อ reference ใน Railway ต้องตรงกับชื่อ PostgreSQL service ที่สร้างจริง หากชื่อ service ไม่ตรง ตัวแปรอาจ resolve ไม่ได้

---

## 5. Phase 3: Deploy Task Service บน Railway

1. เพิ่ม **New Service** ใน Project เดียวกัน และเลือก Deploy from GitHub
2. กำหนด **Root Directory** = `task-service`
3. เพิ่ม **PostgreSQL Plugin** และตั้งชื่อ `task-db`
4. ตั้งค่า **Environment Variables** ดังนี้

```env
DATABASE_URL=${{task-db.DATABASE_URL}}
JWT_SECRET=your-shared-jwt-secret-here
PORT=3002
NODE_ENV=production
```

5. Deploy และตรวจสอบ Deploy Logs
6. ทดสอบ endpoint อย่างน้อย:
   - `GET /api/tasks/health`
   - `POST /api/tasks` (มี JWT)
   - `GET /api/tasks` (มี JWT)
   - `GET /api/tasks` โดยไม่มี JWT → ต้องได้ `401`

> **หมายเหตุ:** `JWT_SECRET` ของ Task Service ต้องตรงกับ Auth Service เพื่อให้ verify token ได้

---

## 6. Phase 4: Deploy User Service บน Railway

1. เพิ่ม **New Service** และกำหนด **Root Directory** = `user-service`
2. เพิ่ม **PostgreSQL Plugin** และตั้งชื่อ `user-db`
3. ตั้งค่า **Environment Variables** ดังนี้

```env
DATABASE_URL=${{user-db.DATABASE_URL}}
JWT_SECRET=your-shared-jwt-secret-here
PORT=3003
NODE_ENV=production
```

4. Deploy และตรวจสอบ Deploy Logs
5. ทดสอบ endpoint อย่างน้อย:
   - `GET /api/users/health`
   - `GET /api/users/me`
   - `PUT /api/users/me`
   - `GET /api/users` โดยใช้ admin token

> **หมายเหตุสำคัญ:** หากผู้ใช้สมัครใหม่แล้ว profile ยังไม่มีใน `user-db` `GET /api/users/me` ควรสร้าง profile เริ่มต้นให้อัตโนมัติก่อนตอบกลับ

---

## 7. Phase 5: Gateway Strategy

นักศึกษาต้องเลือก **อย่างน้อย 1 วิธี** และอธิบายใน README ว่าเลือกวิธีใด พร้อมทั้งให้เหตุผลในการเลือก

| Option | วิธี | ข้อดี | ข้อจำกัด |
|---|---|---|---|
| **A** | Frontend เรียก URL ของแต่ละ service โดยตรง | ง่ายที่สุด ไม่ต้อง deploy gateway เพิ่ม | Frontend ต้องรู้ URL ของทุก service |
| **B** | Deploy Nginx เป็น 1 service บน Railway | มี single entry point คล้าย production | ต้องตั้งค่า Nginx และ deploy เพิ่ม |
| **C** | ใช้ logic ใน Frontend ตัดสินใจ route ไปแต่ละ service | ยืดหยุ่น | Frontend ซับซ้อนขึ้น |

### ข้อกำหนดสำหรับทุก Gateway Option
- `JWT_SECRET` ต้องเหมือนกันทุก service
- `Task Service` ต้องปฏิเสธ request ที่ไม่มี JWT และตอบ `401`
- `User Service` ต้องปฏิเสธ request ที่ไม่มี JWT และตอบ `401`
- `GET /api/users` ต้องเป็น `admin only`
- `Auth Service` ต้องทำงานได้โดยไม่ต้องมี JWT สำหรับ `register`, `login`, `health`

### แนวทางที่แนะนำ
สำหรับการสอบ แนะนำ **Option A** เพื่อลดความซับซ้อนในการ deploy

ตัวอย่าง `frontend/config.js`

```javascript
window.APP_CONFIG = {
  AUTH_URL: 'https://auth-service-production.up.railway.app',
  TASK_URL: 'https://task-service-production.up.railway.app',
  USER_URL: 'https://user-service-production.up.railway.app'
};
```

> **หมายเหตุเพิ่มเติมสำหรับกลุ่มที่ทำ Bonus ด้าน Availability:**  
> หากเลือกทำ Load Balancing ให้ระบุใน README และ architecture diagram อย่างชัดเจนว่า service ใดมีมากกว่า 1 instance และ gateway กระจาย request ไปยัง instance เหล่านั้นอย่างไร

## ตัวเลือกเสริมด้าน Non-Functional Requirement: Availability via Load Balancing

นอกจากโจทย์หลักของ Set 2 ซึ่งเน้นการแยกบริการเป็น 3 services และ 3 databases แล้ว  
กลุ่มที่ทำโจทย์หลักครบถ้วนสามารถเลือกพัฒนาส่วนเสริมเพื่อแสดงความเข้าใจด้าน **Non-Functional Requirement (NFR)** โดยเฉพาะด้าน **Availability** ได้

### แนวทางที่แนะนำ
ให้เลือกเพิ่ม **Load Balancing** สำหรับบาง service โดยแนะนำให้ใช้กับ **Task Service** เป็นหลัก เนื่องจากเป็น service ที่เหมาะกับการสาธิตการกระจายโหลดและการคงการให้บริการเมื่อบาง instance ไม่พร้อมใช้งาน

ตัวอย่างแนวคิด:
- มี `task-service` มากกว่า 1 instance
- ใช้ gateway หรือ reverse proxy กระจาย request ไปยังหลาย instance
- ผู้ใช้ยังเรียกผ่าน public URL เดียว
- ระบบยังตอบสนองได้ แม้บาง instance จะไม่พร้อมใช้งาน

### ขอบเขตของงานเสริมนี้
- งานเสริมนี้เป็น **Bonus / Advanced Option**
- **ไม่บังคับทุกกลุ่ม**
- ไม่จำเป็นต้องทำ database replication หรือ database failover
- ให้เน้นเฉพาะ **application/service-level availability**

### สิ่งที่ต้องอธิบายใน README หากเลือกทำ
- ทำไมจึงเลือก service นี้สำหรับ load balancing
- ใช้วิธีใดในการกระจาย request
- ช่วย availability อย่างไร
- มี trade-off หรือข้อจำกัดอะไรบ้าง

---


## 8. Phase 6: Test Cases และ Screenshots

> **ให้ใช้ภาพหน้าจอจาก Railway (Cloud) เท่านั้น** ไม่รับภาพจาก local environment

### Test Cases

| Test | รายการ (ทดสอบบน Cloud URL) | คะแนน |
|---|---|---:|
| T1 | Railway Dashboard แสดง 3 services + 3 databases และทุก service อยู่ในสถานะ Active | 10 |
| T2 | `POST /api/auth/register` บน Railway Auth URL → `201 Created` พร้อม user object | 10 |
| T3 | `POST /api/auth/login` บน Railway Auth URL → ได้ JWT token | 10 |
| T4 | `GET /api/auth/me` ด้วย JWT → ได้ข้อมูลผู้ใช้ | 10 |
| T5 | `GET /api/users/me` ด้วย JWT → ได้ profile และกรณีผู้ใช้ใหม่ต้องสร้าง profile เริ่มต้นอัตโนมัติได้ | 10 |
| T6 | `PUT /api/users/me` บน Railway → อัปเดตสำเร็จ | 10 |
| T7 | `POST /api/tasks` บน Railway Task URL (มี JWT) → `201 Created` | 10 |
| T8 | `GET /api/tasks` บน Railway Task URL (มี JWT) → แสดง task ของผู้ใช้คนนั้นได้ | 10 |
| T9 | ทดสอบ `401`: protected endpoint ต้องปฏิเสธเมื่อไม่มี JWT | 5 |
| T10 | ทดสอบ `403/200`: member เรียก `GET /api/users` ต้องถูกปฏิเสธ และ admin เรียกได้สำเร็จ | 5 |
| T11 | README อธิบาย Gateway Strategy, Architecture Cloud, Service URLs และวิธีทดสอบครบถ้วน | 10 |
| **รวมคะแนนงานระบบ (กลุ่ม)** |  | **100** |

### Bonus Test Cases — Availability via Load Balancing

| Test ID | รายการตรวจ (Bonus) | คะแนน |
|---|---|---:|
| B1 | มีการออกแบบ load balancing สำหรับอย่างน้อย 1 service (แนะนำ Task Service) และอธิบายใน README/diagram ชัดเจน | 5 |
| B2 | มีหลักฐานว่าคำขอถูกกระจายไปมากกว่า 1 instance เช่น response ระบุ `instance_id`, hostname หรือ logs ที่แยกได้ | 5 |
| B3 | มีหลักฐานว่าระบบยังตอบสนองได้เมื่อ instance หนึ่งไม่พร้อมใช้งาน หรือแสดง degraded operation ได้อย่างสมเหตุสมผล | 5 |

> **รวม Bonus สูงสุด: 15 คะแนน**  
> **หมายเหตุ:** คะแนน Bonus สำหรับ Availability via Load Balancing ใช้สำหรับกลุ่มที่ทำโจทย์หลักครบแล้วเท่านั้น  
> ผู้สอนไม่ควรหักคะแนนกลุ่มที่ไม่ทำส่วนนี้ หากกลุ่มนั้นทำข้อกำหนดหลักของ Set 2 ได้ครบถ้วน

### โครงสร้างโฟลเดอร์ screenshots/

```text
screenshots/
├── 01_railway_dashboard.png
├── 02_auth_register_cloud.png
├── 03_auth_login_cloud.png
├── 04_auth_me_cloud.png
├── 05_user_me_cloud.png
├── 06_user_update_cloud.png
├── 07_task_create_cloud.png
├── 08_task_list_cloud.png
├── 09_protected_401_check.png
├── 10_member_forbidden_403.png
├── 11_admin_users_success.png
├── 12_readme_architecture.png
├── 13_lb_architecture.png
├── 14_lb_multi_instance_result.png
└── 15_lb_availability_failover.png
```

### Bonus Screenshots สำหรับกลุ่มที่ทำ Load Balancing
- `13_lb_architecture.png`  
  ภาพ architecture หรือ deployment diagram ที่แสดง gateway / reverse proxy และหลาย instances ของ service ที่ถูก load balance
- `14_lb_multi_instance_result.png`  
  หลักฐานว่าคำขอถูกกระจายไปยังมากกว่า 1 instance เช่น response แสดง `instance_id`, hostname หรือ log output ที่แยกได้
- `15_lb_availability_failover.png`  
  หลักฐานว่าระบบยังสามารถตอบ request ได้เมื่อ instance หนึ่งไม่พร้อมใช้งาน หรือมีการแสดงผลแบบ degraded but available

---

## 9. วิธีการส่งงาน

### Git Repository

1. สร้าง Repository ชื่อ `engse207-final-lab2-[รหัส1]-[รหัส2]`
2. โครงสร้าง repository ให้ต่อเนื่องจาก Set 1 โดยเพิ่ม `user-service/` และแยก `init.sql` ตามแต่ละ service
3. อัปเดต `README.md` ให้มี **URL จริงของทุก service** บน Railway
4. ส่ง URL Repository ผ่านระบบของมหาวิทยาลัย

### ไฟล์บังคับที่ต้องมี
- `README.md`
- `TEAM_SPLIT.md`
- `INDIVIDUAL_REPORT_[studentid].md` ของสมาชิกแต่ละคน
- source code ทั้งหมด
- `docker-compose.yml`
- `screenshots/`

### README.md สำหรับ Set 2 ต้องมี
- [ ] ชื่อนักศึกษาทั้ง 2 คน และรหัสนักศึกษา
- [ ] URL จริงของทุก service บน Railway
- [ ] Project Overview ว่า Set 2 เป็นการต่อยอดจาก Set 1 อย่างไร
- [ ] Architecture diagram (Cloud version)
- [ ] คำอธิบายว่าใช้ 3 services และ 3 databases อย่างไร
- [ ] Gateway Strategy ที่เลือก พร้อมเหตุผล
- [ ] วิธีรัน local ด้วย Docker Compose
- [ ] วิธี deploy ขึ้น Railway
- [ ] Environment Variables ที่ใช้
- [ ] วิธีทดสอบด้วย curl หรือ Postman
- [ ] Screenshots ตามที่กำหนด
- [ ] Known limitations เช่น ไม่มี foreign key ข้าม database และใช้ `user_id` เป็น logical reference

### เพิ่มเติมสำหรับกลุ่มที่ทำ Bonus ด้าน Availability
- [ ] อธิบาย service ที่ถูกเลือกสำหรับทำ load balancing
- [ ] อธิบายเหตุผลเชิงสถาปัตยกรรมว่าทำไมแนวทางนี้ช่วยด้าน availability
- [ ] มี architecture diagram แสดงหลาย instances และ gateway/proxy
- [ ] อธิบายวิธีพิสูจน์ว่ามีการกระจาย request จริง
- [ ] อธิบายผลการทดสอบเมื่อบาง instance ไม่พร้อมใช้งาน
- [ ] อธิบาย trade-offs หรือข้อจำกัดของแนวทางที่เลือก

### หัวข้อแนะนำใน README สำหรับ Bonus Availability
#### Availability Scenario
อธิบายว่าระบบต้องการเพิ่ม availability ให้ service ใด และเพราะเหตุใด

#### Load Balancing Design
อธิบายจำนวน instances, วิธี route request, และตำแหน่งของ gateway/proxy

#### Evidence of Distribution
อธิบายวิธีแสดงหลักฐานว่าคำขอถูกกระจายไปหลาย instance

#### Degraded Operation / Failover Result
อธิบายผลเมื่อ instance หนึ่งหยุดทำงานหรือไม่พร้อมใช้งาน และระบบยังทำงานได้อย่างไร

#### Trade-offs
อธิบายผลกระทบ เช่น complexity เพิ่มขึ้น, debug ยากขึ้น, deploy ยากขึ้น, config มากขึ้น

### TEAM_SPLIT.md
ให้ระบุอย่างชัดเจนว่าใครรับผิดชอบส่วนใด เช่น
- คนที่ 1: Auth Service + Deploy Auth + Register/Login flow
- คนที่ 2: Task/User Service + Gateway Strategy + README/Cloud test
- งานที่ทำร่วมกัน: docker-compose, debugging, screenshots, architecture diagram

### INDIVIDUAL_REPORT_[studentid].md
สมาชิกแต่ละคนต้องส่งรายงานรายบุคคล โดยสรุปอย่างน้อยหัวข้อต่อไปนี้
1. ส่วนที่รับผิดชอบ
2. สิ่งที่ลงมือทำจริง
3. ปัญหาที่พบและวิธีแก้
4. สิ่งที่เรียนรู้เชิงสถาปัตยกรรม
5. ส่วนที่ยังไม่สมบูรณ์หรืออยากปรับปรุง

### ตัวอย่าง curl สำหรับทดสอบบน Cloud

```bash
# แทน [AUTH_URL], [TASK_URL], [USER_URL] ด้วย URL จริงจาก Railway

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
```

---

## 10. การประเมินรายกลุ่มและรายบุคคล

Set 2 เป็นงานสอบจริงที่ทำเป็นกลุ่ม แต่จะมีการประเมินทั้งในระดับ **รายกลุ่ม** และ **รายบุคคล**

### สัดส่วนคะแนนที่ใช้จริง

| ส่วนประเมิน | รายละเอียด | คะแนน |
|---|---|---:|
| คะแนนงานระบบรายกลุ่ม | ใช้ผลตาม Test Cases ในหัวข้อ Phase 6 | 90 |
| คะแนนเอกสารส่งงานรายกลุ่ม | README, TEAM_SPLIT, screenshots ครบและสอดคล้องกับระบบจริง | 5 |
| คะแนนสัมภาษณ์รายบุคคล | อธิบาย architecture, flow, config, ปัญหาและวิธีแก้ในส่วนที่รับผิดชอบ | 5 |
| **รวม** |  | **100** |

### แนวทางการสัมภาษณ์รายบุคคล
ผู้สอนสามารถสุ่มถามสมาชิกแต่ละคนในหัวข้อต่อไปนี้
- Register และ Login flow ทำงานอย่างไร
- JWT ถูกสร้างและ verify ที่ใดบ้าง
- เหตุใด Set 2 จึงแยกเป็น 3 databases
- User Service สร้าง profile เริ่มต้นอย่างไร
- Gateway Strategy ที่เลือกมีข้อดีข้อจำกัดอย่างไร
- หาก deploy แล้ว service ติดต่อฐานข้อมูลไม่ได้ จะตรวจสอบและแก้ไขอย่างไร

### หมายเหตุ
- สมาชิกทุกคนต้องสามารถอธิบายภาพรวมระบบได้
- สมาชิกแต่ละคนต้องสามารถอธิบายส่วนที่ตนรับผิดชอบได้
- คะแนนสัมภาษณ์อาจแตกต่างกันในแต่ละคน แม้อยู่ในกลุ่มเดียวกัน

## หมายเหตุสำหรับงานเสริม (Bonus)

Set 2 มีโจทย์หลักเพื่อประเมินความสามารถในการออกแบบและ deploy ระบบแบบ 3 services + 3 databases บน Cloud ให้ทำงานได้จริงภายในเวลาที่กำหนด

สำหรับกลุ่มที่ทำโจทย์หลักครบถ้วนและต้องการแสดงความเข้าใจด้าน Non-Functional Requirement เพิ่มเติม สามารถเลือกทำงานเสริมด้าน **Availability via Load Balancing** ได้ โดยผู้สอนจะพิจารณาให้คะแนน Bonus ตามหลักฐานการออกแบบ การทดสอบ และการอธิบายใน README

---

> **ขอให้นักศึกษาวางแผนการทำงานเป็นลำดับ ทำทีละ Phase และทดสอบเป็นระยะ**
>
> *ENGSE207 Software Architecture | มหาวิทยาลัยเทคโนโลยีราชมงคลล้านนา*
