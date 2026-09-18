# Chat App Backend

A real-time chat application built with Node.js, Express, Socket.io, and MongoDB Atlas.

---

## Tech Stack

- **Node.js + Express** – Backend server
- **Socket.io** – Real-time messaging
- **MongoDB Atlas** – Cloud database
- **JWT + bcrypt** – Authentication

---

## Run Locally

```bash
# Clone the repo
git clone https://github.com/Princy0309/Chat-App-Backend.git
cd Chat-App-Backend

# Install dependencies
npm install

# Create a .env file with the following
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key

# Start the server
node server.js
```

---

## API Endpoints

Base URL (local): `http://localhost:5000`  
Base URL (production): `https://chat-app-backend-i2n2.onrender.com`

---

### POST `/auth/register`
Register a new user.

**Request Body:**
```json
{
  "username": "Princy",
  "email": "princy@gmail.com",
  "password": "hello123"
}
```

**Responses:**
```json
201 { "message": "User registered successfully" }
400 { "message": "User already exists" }
```

---

### POST `/auth/login`
Login with existing credentials.

**Request Body:**
```json
{
  "email": "princy@gmail.com",
  "password": "hello123"
}
```

**Responses:**
```json
200 { "token": "eyJhbGci...", "username": "Princy" }
400 { "message": "Invalid credentials" }
```

---

### GET `/`
Check if server is running.

```
Response: chat app backend is running
```

---

## Socket Events

| Event | Direction | Payload |
|---|---|---|
| `sendMessage` | Client → Server | `{ userId, text }` |
| `previousMessages` | Server → Client | Array of messages |
| `newMessage` | Server → Client | Single message object |

---

## Database Models

**User**
```
username  – String, required, unique
email     – String, required, unique
password  – String, hashed
createdAt – Auto timestamp
```

**Message**
```
sender    – ObjectId (ref: User)
text      – String, required
createdAt – Auto timestamp
```

---

## Authentication

Uses JWT tokens. After login, the token is stored in `localStorage` and sent with requests via the `Authorization` header.

---

## Deployment

Deployed on Render → https://chat-app-backend-i2n2.onrender.com
