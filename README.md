# 💬 RealTimeChat

RealTimeChat is a modern, full-stack, real-time chat application built using the MERN stack (MongoDB, Express, React, Node.js) and WebSockets. It enables seamless instant messaging between users with online status indicators, search capabilities, and user profile management.

---

## Live Demo
Link : https://real-time-chat-liard-nine.vercel.app/login

## 🚀 Features

- **Real-Time Messaging**: Instant message delivery and receipt powered by Socket.io.
- **User Authentication**: Secure signup, login, and logout flow using JSON Web Tokens (JWT) stored in HTTP-only cookies.
- **Online Status Tracking**: Live indicator showing when users are currently online or offline.
- **WhatsApp-Style User Search**: Easily search and discover other registered users from the sidebar.
- **Profile Customization**: Edit profile details including name, username, gender, password, and upload a profile photo (handled securely via Multer and stored in the backend).
- **Responsive UI/UX**: A clean, modern interface styled using Tailwind CSS and DaisyUI, featuring smooth transitions and dark-mode styling.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React.js
- **State Management**: Redux Toolkit & Redux Persist (for persistent authentication and active chat state)
- **Styling**: Tailwind CSS & DaisyUI
- **Icons**: Lucide React & React Icons
- **HTTP Client**: Axios
- **Real-Time Communication**: Socket.io-client

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Object modeling with Mongoose)
- **Real-Time Communication**: Socket.io
- **Security**: Bcrypt.js (Password hashing) & JSON Web Tokens (Authentication & Authorization)
- **Middleware**: Cookie-Parser, CORS
- **File Upload**: Multer (for handling profile photo uploads)

---

## 📁 Directory Structure

```text
RealTimeChat/
├── backend/
│   ├── config/             # DB connection logic
│   ├── controllers/        # Route controllers (user, message logic)
│   ├── middleware/         # Auth & validation middleware
│   ├── models/             # Mongoose schemas (User, Message, Conversation)
│   ├── routes/             # Express API routes
│   ├── socket/             # Socket.io configuration and event handlers
│   ├── index.js            # Server entry point
│   └── package.json        # Backend scripts & dependencies
├── frontend/
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── components/     # React UI components (Sidebar, MessageContainer, etc.)
│   │   ├── hooks/          # Custom hooks (fetching messages, real-time listeners)
│   │   ├── redux/          # Redux slices and store configuration
│   │   ├── App.js          # Main React entry component and routing
│   │   └── index.js        # React DOM entry point
│   └── package.json        # Frontend scripts & dependencies
└── README.md               # Main project documentation
```

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js installed locally.
- A MongoDB database (either a local instance or a MongoDB Atlas URI).

### 1. Clone the Repository
```bash
git clone https://github.com/aashishprajapati99679/RealTimeChat.git
cd RealTimeChat
```

### 2. Configure Backend
Navigate to the `backend` folder and install dependencies:
```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:
```env
PORT=8080
MONGODB_URI=your_mongodb_connection_uri
JWT_SECRET=your_jwt_secret_key
```

### 3. Configure Frontend
Navigate to the `frontend` folder and install dependencies:
```bash
cd ../frontend
npm install
```

Create a `.env` file in the `frontend/` directory to configure the base URL for the backend:
```env
REACT_APP_BASE_URL=http://localhost:8080
```

---

## 🏃 Running the Application

### Start Backend Server
In the `backend/` directory:
```bash
npm run dev
```
*The server will run on `http://localhost:8080`.*

### Start Frontend Dev Server
In the `frontend/` directory:
```bash
npm start
```
*The React development server will start on `http://localhost:3000`.*

---

## 🔌 API Endpoints

### User Routes (`/api/v1/user`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| **POST** | `/register` | Registers a new user | No |
| **POST** | `/login` | Authenticates a user and sets JWT cookie | No |
| **GET** | `/logout` | Clears user session / JWT cookie | No |
| **GET** | `/` | Retrieves a list of all other users | Yes |
| **PUT** | `/update` | Updates user profile details & avatar | Yes |

### Message Routes (`/api/v1/message`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| **POST** | `/send/:id` | Sends a message to a specific user (by ID) | Yes |
| **GET** | `/:id` | Fetches conversation history with a user (by ID) | Yes |
| **PUT** | `/mark-read/:id` | Marks received messages from a user as read | Yes |
