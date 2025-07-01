const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectdb = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
connectdb();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/tasks', require('./routes/tasks'));

// Welcome route
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to Task Manager API',
        version: '1.0.0',
        endpoints: {
            'GET /tasks': 'Get all tasks (with optional ?status=pending|completed filter)',
            'GET /tasks/:id': 'Get single task',
            'POST /tasks': 'Create new task',
            'PUT /tasks/:id': 'Update task',
            'DELETE /tasks/:id': 'Delete task'
        }
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        error: 'Something went wrong!'
    });
});

// Handle 404
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Route not found'
    });
});

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
    console.log(`Server running in mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    server.close(() => {
        process.exit(1);
    });
});