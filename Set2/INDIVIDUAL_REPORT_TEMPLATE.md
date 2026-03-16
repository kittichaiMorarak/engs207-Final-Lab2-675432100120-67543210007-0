# INDIVIDUAL_REPORT_[67543210012-0].md

## ข้อมูลผู้จัดทำ
- ชื่อ-นามสกุล: [กิตติชัย โมรารักษื]
- รหัสนักศึกษา: [67543210012-0]
- กลุ่ม: [17]

## ขอบเขตงานที่รับผิดชอบ
Nginx, Docker Compose ทดสอบระบบ

## สิ่งที่ได้ดำเนินการด้วยตนเอง
อธิบายสิ่งที่ลงมือพัฒนาด้วยตนเองโดยสรุป เช่น
- ทดสอบระบบ
- แก้ไข Nginx
- เช็ค docker ว่าสามารถรันได้ปกติมั้ย และแก้ไข


## ปัญหาที่พบและวิธีการแก้ไข
ปัญหาการเชื่อมต่อระหว่าง Container

ปัญหา
ในช่วงแรก Service ต่าง ๆ ไม่สามารถติดต่อกันได้ผ่าน Docker Network ทำให้ API Gateway ไม่สามารถส่ง request ไปยัง service อื่นได้

สาเหตุ
เกิดจากการกำหนดชื่อ service ในไฟล์ docker-compose.yml ไม่ตรงกับที่ใช้ใน nginx configuration

วิธีแก้ไข

ตรวจสอบชื่อ service ใน docker-compose.yml

แก้ไข nginx.conf ให้ proxy ไปยัง service name ที่ถูกต้อง

ตัวอย่าง

proxy_pass http://auth-service:3001;
ปัญหา Environment Variables ไม่ถูกตั้งค่า

ปัญหา
ขณะรัน docker compose พบ warning เช่น

POSTGRES_USER variable is not set
POSTGRES_PASSWORD variable is not set
JWT_SECRET variable is not set

สาเหตุ
ยังไม่ได้กำหนดค่า environment variables

วิธีแก้ไข

สร้างไฟล์ .env เพื่อกำหนดค่าต่าง ๆ

ตัวอย่าง

POSTGRES_USER=admin
POSTGRES_PASSWORD=secret123
POSTGRES_DB=taskboard

JWT_SECRET=mysecretkey
JWT_EXPIRES=1d

## สิ่งที่ได้เรียนรู้จากงานนี้
# สิ่งที่ได้เรียนรู้จากการพัฒนาโครงการ

จากการพัฒนาระบบใน Final Lab Set 2 ซึ่งใช้แนวคิด **Microservices Architecture** ผู้พัฒนาได้เรียนรู้ทั้งในด้านเทคนิคการพัฒนาระบบและแนวคิดด้านสถาปัตยกรรมซอฟต์แวร์ ดังนี้

---

## 1. การแยก Service (Service Separation)

การออกแบบระบบในรูปแบบ Microservices ทำให้ระบบถูกแบ่งออกเป็นหลายบริการ เช่น Auth Service, Task Service, User Service และ Log Service โดยแต่ละ service ทำงานแยกจากกันและมีหน้าที่เฉพาะของตนเอง

ข้อดีของการแยก service ได้แก่

* สามารถพัฒนาและปรับปรุงแต่ละ service ได้อย่างอิสระ
* ลดความซับซ้อนของระบบขนาดใหญ่
* สามารถขยายระบบ (scaling) เฉพาะ service ที่ต้องการได้

อย่างไรก็ตาม การแยก service ออกเป็นหลายส่วนทำให้ต้องมีการจัดการเรื่องการสื่อสารระหว่าง service เพิ่มขึ้น เช่น การใช้ API Gateway และการกำหนด endpoint ให้ชัดเจน

---

## 2. การทำงานของ JWT Authentication (JWT Flow)

ระบบใช้ JWT (JSON Web Token) สำหรับการยืนยันตัวตนของผู้ใช้ โดยกระบวนการทำงานมีลำดับดังนี้

1. ผู้ใช้ส่งคำขอ login ไปยัง Auth Service
2. Auth Service ตรวจสอบ username และ password
3. หากถูกต้อง ระบบจะสร้าง JWT token
4. Client จะเก็บ token ไว้และส่งใน header Authorization
5. Service อื่น ๆ จะตรวจสอบ token ก่อนอนุญาตให้เข้าถึงข้อมูล

แนวทางนี้ช่วยให้ระบบสามารถทำงานแบบ **stateless authentication** และลดภาระของ server ในการเก็บ session

---

## 3. การใช้ Reverse Proxy และ API Gateway

ในระบบนี้ใช้ Reverse Proxy ผ่าน Nginx เพื่อทำหน้าที่เป็น API Gateway ซึ่งเป็นจุดรับ request จาก client ก่อนจะส่งต่อไปยัง service ที่เหมาะสม

หน้าที่ของ Gateway ได้แก่

* การกำหนดเส้นทางของ request (Routing)
* การเพิ่ม Security Headers
* การจำกัดจำนวน request (Rate Limiting)
* การป้องกัน endpoint ภายในระบบ

การมี API Gateway ทำให้ client ไม่จำเป็นต้องรู้ตำแหน่งของแต่ละ service ภายในระบบ

---

## 4. HTTPS Termination

ในระบบ Cloud การเข้ารหัส HTTPS มักถูกจัดการที่ Gateway หรือ Cloud Platform เช่น Railway โดย Gateway จะรับการเชื่อมต่อ HTTPS จาก client แล้วแปลงเป็น HTTP ภายใน network ของ service

ข้อดีของแนวทางนี้คือ

* ลดภาระของ service ภายใน
* จัดการ certificate ได้ง่ายจากจุดเดียว
* เพิ่มความปลอดภัยในการสื่อสารกับ client

---

## 5. การออกแบบฐานข้อมูล (Shared Database Trade-off)

ระบบนี้ใช้แนวคิด **Database-per-Service** ซึ่งหมายถึงแต่ละ service มีฐานข้อมูลของตนเอง

ข้อดี

* ลดการพึ่งพากันของ service
* เพิ่มความยืดหยุ่นในการพัฒนา
* สามารถเปลี่ยน schema ของแต่ละ service ได้โดยไม่กระทบระบบอื่น

ข้อเสีย

* การรวมข้อมูลจากหลาย service ทำได้ยากขึ้น
* ต้องใช้ API หรือ event ในการแลกเปลี่ยนข้อมูล

ดังนั้นการเลือกใช้ Shared Database หรือ Database-per-Service ต้องพิจารณาตามความเหมาะสมของระบบ

---

## 6. การทำงานร่วมกันเป็นทีม

การพัฒนาโปรเจคนี้ยังช่วยให้เรียนรู้การทำงานร่วมกันเป็นทีม โดยมีการแบ่งหน้าที่ตาม service เช่น

* ผู้พัฒนา Auth Service
* ผู้พัฒนา Task Service
* ผู้พัฒนา User Service
* ผู้ดูแล API Gateway และระบบ deployment

การแบ่งงานในลักษณะนี้ช่วยให้สมาชิกแต่ละคนสามารถรับผิดชอบส่วนของตนเองได้อย่างชัดเจน และสามารถพัฒนาระบบได้พร้อมกัน

---

# สรุป

จากการพัฒนาระบบนี้ ผู้พัฒนาได้เรียนรู้แนวคิดสำคัญของการออกแบบระบบสมัยใหม่ เช่น Microservices Architecture, API Gateway, JWT Authentication และการใช้งาน Docker และ Cloud Platform ซึ่งเป็นทักษะสำคัญสำหรับการพัฒนาระบบขนาดใหญ่ในอนาคต

