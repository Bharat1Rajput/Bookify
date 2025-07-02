# 📅 Appointment Booking System

A full-stack web application that allows users and service providers to book and manage time slots efficiently. Built using **React**, **Node.js**, **Express**, and **MongoDB** with role-based authentication.

---

## 🚀 Features

### 👤 User Authentication
- Signup/Login with **JWT**
- Role-based access: **User** (Student) and **Service Provider** (Teacher)

### 📆 Slot Management (Service Providers)
- Create, edit, and delete slots
- Prevent overlapping or duplicate slots
- Only accessible by authenticated providers

### ✅ Booking System (Users)
- View available slots
- Book a slot (only if not already booked)
- View own bookings
- Cancel bookings

### 💡 Additional
- Fully protected routes using middleware
- Frontend route restriction based on user role
- Clean UI with **Tailwind CSS**

---

## 🛠️ Tech Stack

| Tech             | Use                          |
|------------------|-------------------------------|
| React            | Frontend                      |
| Tailwind CSS     | Styling                       |
| Axios            | HTTP Client                   |
| Node.js + Express| Backend server & APIs         |
| MongoDB + Mongoose | Database and schema modeling |
| JWT              | Authentication                |

---

## 📁 Folder Structure
/server

└── /controllers

└── /models

└── /routes

└── /middlewares

└── server.js


---

## ⚙️ Setup Instructions

### 🔧 Backend

```bash
cd server
npm install
npm start

cd client
npm install
npm run dev
```
Make sure MongoDB is running locally or update your MONGO_URI in .env.

---
## 📄 API Endpoints

### Auth
POST /api/auth/signup

POST /api/auth/login

### Slots (Service Provider only)
POST /api/slot/create

GET /api/slot/view

PUT /api/slot/:id

DELETE /api/slot/:id

### Bookings
POST /api/slot/book/:slotId

GET /api/booking/view

DELETE /api/bookings/:id

## Learnings
Implemented robust role-based auth using JWT

Built a real-world booking system with validation

Managed protected routes on both frontend and backend

Learned full integration of MongoDB with Mongoose and Express


