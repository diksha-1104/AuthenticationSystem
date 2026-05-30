# Secure Authentication System

A robust and secure backend Authentication System built using Node.js, Express.js, and MongoDB. This project implements a complete session management flow utilizing **JWT (Access/Refresh Token strategy)** handled securely via HTTP-only cookies, alongside multi-device logout capabilities.

---

## 🚀 Features

* **User Management:** Secure user registration and login flows.
* **Token-Based Auth:** Dual-token strategy with short-lived **Access Tokens** and long-lived **Refresh Tokens**.
* **Session Management:** Active session tracking in MongoDB, allowing users to log out of their current device or revoke access across **all devices**.
* **Enhanced Security:** Passwords hashed via SHA-256, protected routes, and tokens stored securely inside **HTTP-only, SameSite cookies** to mitigate XSS and CSRF risks.
* **Database Integration:** Scalable data modeling using Mongoose schemas for Users and Sessions.

---

## 🛠️ Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB, Mongoose ODM
* **Authentication & Security:** JSON Web Tokens (JWT), Crypto (SHA-256), Cookie-Parser
* **Utilities:** Morgan (logging), Dotenv (environment configuration)

---

## 📂 Project Structure

```text
AuthenticationSystem/
├── src/
│   ├── config/
│   │   ├── config.js
│   │   └── database.js
│   ├── controllers/
│   │   └── auth.controller.js
│   ├── models/
│   │   ├── user.model.js
│   │   └── session.model.js
│   ├── routes/
│   │   └── authRoutes.js
│   └── app.js
├── .env.example
├── package.json
└── server.js
```

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/diksha-1104/AuthenticationSystem.git
cd AuthenticationSystem
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create Environment Variables

Create a `.env` file in the root directory.

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 4. Start the Server

```bash
npm run dev
```

Server will start on:

```text
http://localhost:3000
```

---
## Authentication Flow

1. User registers or logs in.
2. Password is hashed using SHA-256.
3. Access Token is generated (15 minutes validity).
4. Refresh Token is generated (7 days validity).
5. Refresh Token is stored securely in an HTTP-only cookie.
6. Session information is stored in MongoDB.
7. Access Token is used for protected routes.
8. Refresh Token is used to obtain new access tokens.

---
## Security Features

- SHA-256 Password Hashing
- JWT Authentication
- HTTP-Only Cookies
- Secure Cookies
- Session Tracking
- Refresh Token Rotation
- Protected Routes

---
