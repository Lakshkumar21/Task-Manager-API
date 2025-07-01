const express = require('express');
const { body } = require('express-validator');
const {
    getTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask
} = require('../controllers/taskController');

const router = express.Router();

// Validation middleware
const validateTask = [
    body('title')
        .notEmpty()
        .withMessage('Title is required')
        .isLength({ min: 1, max: 100 })
        .withMessage('Title must be between 1 and 100 characters')
        .trim(),
    body('status')
        .optional()
        .isIn(['pending', 'completed'])
        .withMessage('Status must be either pending or completed')
];

const validateTaskUpdate = [
    body('title')
        .optional()
        .notEmpty()
        .withMessage('Title cannot be empty')
        .isLength({ min: 1, max: 100 })
        .withMessage('Title must be between 1 and 100 characters')
        .trim(),
    body('status')
        .optional()
        .isIn(['pending', 'completed'])
        .withMessage('Status must be either pending or completed')
];

// Routes
router.route('/')
    .get(getTasks)
    .post(validateTask, createTask);

router.route('/:id')
    .get(getTask)
    .put(validateTaskUpdate, updateTask)
    .delete(deleteTask);

module.exports = router;