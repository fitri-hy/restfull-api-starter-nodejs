const express = require('express');
const cacheMiddleware = require('../middlewares/cache.middleware');
const router = express.Router();

const taskRoutes = require('./task.route');
// Task Route
router.use('/tasks', taskRoutes);

const redisRoutes = require('./redis.routes');
// Redis Route
router.use('/data', cacheMiddleware, redisRoutes);

// Upload Route
const uploadFile = require('../controllers/upload.controller');
router.post('/upload', uploadFile);
router.post('/upload/:folderName', uploadFile);

// User Route
const userRoutes = require('./user.routes');
router.use('/users', userRoutes);

// Add more routes if needed

module.exports = router;
