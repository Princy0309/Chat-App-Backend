## Chat-App-Backend
A real-time chat application built with Node.js, Express, socket.io and MongoDB Atlas

## Setup and Run locally
 # 1. clone the repo
     git clone https://github.com/Princy0309/Chat-App-Backend.git

 # 2. install dependencies
    cd Chat-App-Backend
    npm install

# 3. Create .env file 
  PORT = 5000
  MONGO_URI = your_mongodb_atlas_connection_string
  JWT_SECRET = Your_jwt_secret_key

# 4. start the server
 node server.js

## API endpoints
 
 local : http://localhost:5000
 Production : 

1. Register user 
  POST /auth/register
  REQUEST Body:
     {
      "username": "Princy",
       "email": "princy@gmail.com",
       "password": "hello123"
    }

  SUCCESS Response (201):
    {
      "message": "User registered successfully"
    }

  ERROR Response (400):
    {
        "message": "User already exists"
    }

2. Login User
   POST /auth/login
   REQUEST Body:
    {
      "email": "princy@gmail.com",
      "password": "hello123"
    }

    SUCECESS Response (200):
    {
        "token": "eyJhbGciOiJIUzI1NiJ9...",
        "username": "Princy"
    }

    ERROR Response (400):
    {
        "message": "Invalid credentials"
    }

3. Test Route
   GET /
    No parameters required
    Response:
    chat app backend is running 

# Database Models

1. User
   {
    "username": "String(required, unique)",
    "email": "String(required, unique)",
    "password": "String(hashed, required)",
    "createdAt": "Date(auto)",
    "updateAt": "Date(auto)"
   }

2. Message 
   {
    "sender": "ObjectId(ref: User, required)',
    "text": "String(required)",
    "createdAt": "Date (auto)",
    "updatedAt": "Date (auto)"
   }

# Authentication
 The app uses JWT(JSON Web Tokens) for authentication


