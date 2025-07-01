# Task Manager REST API

A robust RESTful API for managing tasks with full CRUD operations, built with Node.js, Express.js, and MongoDB.

## 📋 Project Overview

This API allows you to create, read, update, and delete tasks with persistent storage. Each task contains an ID, title, status (pending/completed), and creation timestamp. The API includes input validation, error handling, and filtering capabilities.

## 🚀 Technologies Used

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **express-validator** - Input validation middleware
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## 📁 Project Structure

```
task-manager-api/
├── config/
│   └── db.js          # Database connection configuration
├── controllers/
│   └── taskController.js    # Request handlers and business logic
├── models/
│   └── Task.js              # MongoDB schema definition
├── routes/
│   └── tasks.js             # API route definitions
├── .env.example             # Environment variables template
├── .gitignore              # Git ignore rules
├── package.json            # Project dependencies and scripts
├── README.md               # Project documentation
└── server.js               # Main application entry point
```

## 🛠️ API Routes Documentation

### Base URL
```
http://localhost:3000/tasks
```

### Endpoints

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| GET | `/tasks` | Get all tasks | None |
| GET | `/tasks?status=pending` | Get filtered tasks | None |
| GET | `/tasks/:id` | Get single task | None |
| POST | `/tasks` | Create new task | `{ "title": "string", "status": "pending|completed" }` |
| PUT | `/tasks/:id` | Update task | `{ "title": "string", "status": "pending|completed" }` |
| DELETE | `/tasks/:id` | Delete task | None |

### Query Parameters

- `status` (optional): Filter tasks by status (`pending` or `completed`)
- `sortBy` (optional): Sort field (default: `created_at`)
- `order` (optional): Sort order (`asc` or `desc`, default: `desc`)

### Request/Response Examples

#### Create Task
**Request:**
```json
POST /api/tasks
{
  "title": "Task-1",
  "status": "pending"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "686451eb2720807e376bc324",
    "title": "Task-1",
    "status": "pending",
    "created_at": "2025-07-01T21:23:55.915Z",
    "createdAt": "2025-07-01T21:23:55.918Z",
    "updatedAt": "2025-07-01T21:23:55.918Z",
    "__v": 0
  }
}
```

#### Get All Tasks
**Request:**
```json
GET /tasks
```

**Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "686451eb2720807e376bc324",
        "title": "Task-1",
        "status": "pending",
        "created_at": "2025-07-01T21:23:55.915Z",
        "createdAt": "2025-07-01T21:23:55.918Z",
        "updatedAt": "2025-07-01T21:23:55.918Z",
        "__v": 0
    },
    {
        "_id": "6864044845dfef0184859988",
        "title": "Attend meeting",
        "status": "pending",
        "created_at": "2025-07-01T15:52:40.159Z",
        "createdAt": "2025-07-01T15:52:40.165Z",
        "updatedAt": "2025-07-01T15:52:40.165Z",
        "__v": 0
    }
  ]
}
```

#### Update Task
**Request:**
```json
PUT /tasks/6864044845dfef0184859988
{
  "status": "completed"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "6864044845dfef0184859988",
    "title": "Attend meeting",
    "status": "completed",
    "created_at": "2025-07-01T15:52:40.159Z",
    "createdAt": "2025-07-01T15:52:40.165Z",
    "updatedAt": "2025-07-01T15:52:40.165Z",
    "__v": 0
  }
}
```

## 🏃‍♂️ Running Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd task-manager-api
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` file with your configuration:
   ```env
   MONGODB_URI= 
   PORT= 
   NODE_ENV= 
   ```

4. **Start MongoDB:**
   - For local MongoDB: `mongod`
   - For MongoDB Atlas: Use the connection string in MONGODB_URI

5. **Run the application:**
   
   **Development mode (with auto-restart):**
   ```bash
   npm run dev
   ```
   
   **Production mode:**
   ```bash
   npm start
   ```

6. **Verify the API is running:**
   Open browser or Postman and visit: `http://localhost:3000`


## 📮 Sample Postman Request Flows

### Flow 1: Complete Task Management
1. **Create Task:** POST `/tasks` with body `{"title": "Test Task"}`
2. **Get All Tasks:** GET `/tasks` to see the created task
3. **Update Task:** PUT `/tasks/{id}` with body `{"status": "completed"}`
4. **Filter Completed:** GET `/tasks?status=completed`
5. **Delete Task:** DELETE `/tasks/{id}`

### Flow 2: Error Handling Test
1. **Invalid Create:** POST `/tasks` with empty body (should return validation error)
2. **Invalid ID:** GET `/tasks/invalid-id` (should return format error)
3. **Not Found:** GET `/tasks/65f123abc456def789012999` (should return 404)


## 🔧 .env File Details

Create a `.env` file in the root directory with the following variables:

```env
# MongoDB connection string
# For local MongoDB:
MONGODB_URI=mongodb://localhost:27017/TaskManagerAPI

# For MongoDB Atlas:
# MONGODB_URI=your_mongodb_connection_string_here

# Server port (default: 3000)
PORT=3000
```

### Environment Variables Explanation:
- **MONGODB_URI**: Database connection string
- **PORT**: Server port number

## 🚨 Error Handling

The API includes comprehensive error handling:

- **400 Bad Request**: Invalid input data or malformed requests
- **404 Not Found**: Resource doesn't exist
- **500 Internal Server Error**: Server-side errors

Example error response:
```json
{
  "success": false,
  "error": "Validation Error",
  "details": [
    {
      "msg": "Title is required",
      "param": "title",
      "location": "body"
    }
  ]
}
```

## 📝 Input Validation

- **Title**: Required, 1-100 characters, trimmed
- **Status**: Optional, must be 'pending' or 'completed'
- **ID**: Must be valid MongoDB ObjectId format

## 🔍 Features

- ✅ Full CRUD operations
- ✅ Input validation with detailed error messages
- ✅ MongoDB integration with Mongoose
- ✅ Task filtering by status
- ✅ Sorting capabilities
- ✅ CORS enabled
- ✅ Environment-based configuration
- ✅ Comprehensive error handling
- ✅ RESTful API design

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request