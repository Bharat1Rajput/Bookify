# Bookify - An Appointment Booking System 📅

A **production-ready full-stack appointment booking application** built with modern web technologies, featuring role-based authentication, slot management, and real-time booking capabilities for seamless user-provider interactions.

## 🚀 Live Demo
- **click here** - https://appointment-app-topaz.vercel.app/


## ✨ Features

### Core Functionality
- 🔐 **User Authentication** - JWT-based secure authentication with role management
- 👥 **Role-Based Access** - Separate interfaces for Users and Service Providers
- 📆 **Slot Management** - Create, edit, and delete time slots with overlap prevention
- ✅ **Booking System** - View available slots, book appointments, and manage bookings
- 🚫 **Conflict Prevention** - Validate slots or prevent duplicate slot creation
- 📱 **Responsive Design** - Clean, Functional UI

### Technical Features
- 🛡️ **Protected Routes** - Frontend and backend route protection based on user roles
- 📊 **RESTful API Design** - Clean, intuitive endpoints for all operations
- 🔒 **Middleware Security** - Comprehensive authentication and authorization middleware
- 📝 **Data Validation** - Robust input validation and error handling

## 🛠 Tech Stack

### Frontend
- **Framework:** React.js + Vite
- **Styling:** Tailwind CSS
- **HTTP Client:** Axios
- **State Management:** React Hooks
- **Routing:** React Router DOM

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (JSON Web Tokens)
- **Security:** bcryptjs, CORS protection

### Development Tools
- **Environment Management:** dotenv
- **Development Server:** Vite (Frontend), nodemon (Backend)
- **Version Control:** Git & GitHub

## 🏗 Architecture

```
Bookify/
├── frontend/                    # Frontend React application
│   ├── src/
│   │   ├── pages/           # Route components
│   │   ├── index.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── index.html
│   └── package.json
│   └── vercel.json

├── backend/                   # Backend Node.js application
│   ├── controllers/         # Business logic layer
│   │   ├── authController.js
│   │   ├── slotController.js
│   │   └── bookingController.js
│   ├── models/             # Database models
│   │   ├── User.js
│   │   ├── Slot.js
│   │   └── Booking.js
│   ├── routes/             # API routes
│   │   ├── authRoutes.js
│   │   ├── slotRoutes.js
│   │   └── bookingRoutes.js
│   ├── middlewares/        # Custom middleware
│   │   ├── authMiddleware.js         # Authentication middleware
│   │   └── roleCheckMW.js     # Role-based authorization
│   ├── .env               # Environment variables
│   ├── package.json
│   └── server.js          # Application entry point
```

## 🚀 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- Git

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/Bharat1Rajput/Bookify.git
   cd Bookify
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   ```

4. **Environment Configuration**
   Create `.env` file in the server directory:
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/yourdbname
   JWT_SECRET=your_super_secret_jwt_key_here
   ```

5. **Start MongoDB**
   ```bash
   # If using local MongoDB
   mongosh
   
   # Or ensure MongoDB Atlas connection is configured
   ```

6. **Run the application**
   ```bash
   # Start backend (from backend directory)
   npm start
   
   # Start frontend (from frontend directory)
   npm run dev
   ```

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description | 
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register new user | 
| POST | `/api/auth/login` | Login user | 

### Slot Management Endpoints 

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/slot/create` | Create new time slot | Yes (Provider) |
| GET | `/api/slot/view` | Get all slots for provider | Yes (Provider) |
| GET | `/api/slot/available` | Get all slots  | Yes (both) |
| PUT | `/api/slot/edit/:id` | Update existing slot | Yes (Provider) |
| DELETE | `/api/slot/delete/:id` | Delete slot | Yes (Provider) |

### Booking Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/booking/book/:slotId` | Book an available slot | Yes (User) |
| GET | `/api/booking/view` | Get user's bookings | Yes (User) |
| GET | `/api/booking/provider/bookings` | Get provider's bookings | Yes (provider) |
| DELETE | `/api/booking/cancel/:id` | Cancel booking | Yes (User) |

### Request/Response Examples

#### Create Slot
```json
POST /api/slot/create
{
  "date": "2024-08-15",
  "startTime": "10:00",
  "endTime": "11:00",
  "title": "Math Tutoring Session"
}
```

## 🔒 Security Features

- **JWT Authentication:** Stateless token-based authentication system
- **Role-Based Authorization:** Separate permissions for Users and Service Providers
- **Password Security:** bcrypt hashing with salt rounds for secure password storage
- **Protected Routes:** Middleware-based route protection on both frontend and backend
- **Input Validation:** Comprehensive request validation and sanitization
- **CORS Configuration:** Cross-origin resource sharing setup for secure API access
- **Conflict Prevention:** Database-level validation to prevent booking conflicts

## 📈 Key Learnings

### Technical Achievements
- **🔐 Robust Authentication:** Successfully implemented JWT-based role authentication system
- **📅 Real-world Booking Logic:** Built comprehensive appointment booking with conflict resolution
- **🛡️ Security Implementation:** Deployed protected routes across full-stack architecture
- **🗄️ Database Integration:** Mastered MongoDB integration with Mongoose for complex relationships
- **⚡ Performance Optimization:** Implemented efficient querying and state management

### Development Skills
- Full-stack development workflow mastery
- RESTful API design principles
- React state management and hooks
- MongoDB schema design and relationships
- Middleware pattern implementation

## 📊 Project Statistics

- **Total Components:** 15+ React components
- **API Endpoints:** 8 RESTful endpoints
- **Database Models:** 3 (User, Slot, Booking)
- **Middleware Functions:** 4+ security and validation layers
- **Role-Based Features:** 2 distinct user experiences

## 🚀 Future Enhancements

- [ ] **Real-time Notifications** - WebSocket integration for instant booking updates
- [ ] **Email Integration** - Automated confirmation and reminder emails
- [ ] **Calendar Integration** - Google Calendar sync for providers
- [ ] **Payment Gateway** - Stripe integration for paid appointments
- [ ] **Video Conferencing** - Zoom/Meet integration for virtual appointments
- [ ] **Advanced Analytics** - Booking statistics and provider insights
- [ ] **Mobile App** - React Native mobile application
- [ ] **Multi-language Support** - Internationalization for global users

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**[Your Name]**
- GitHub: [@Bharat1Rajput](https://github.com/Bharat1Rajput)
- LinkedIn: [Bharat Singh](https://www.linkedin.com/in/bharat-singh-1288a4254)
- Email: bharattsingh33@gmail.com

## 🙏 Acknowledgments

- React.js community for excellent documentation and ecosystem
- MongoDB team for the robust database solution
- Tailwind CSS for the utility-first styling approach
- Express.js community for the minimalist web framework

---

⭐ **Star this repository if it helped you learn full-stack development!**

**Built with ❤️ for seamless appointment management**
