const express = require('express');
const cacheMiddleware = require('../middlewares/cache.middleware');
const userRoutes = require('./user.routes');
const redisRoutes = require('./redis.routes');
const taskRoutes = require('./task.route');
const router = express.Router();

// Task Route
router.use('/tasks', taskRoutes);

// Redis Route
router.use('/data', cacheMiddleware, redisRoutes);

// User Route
router.use('/users', userRoutes);

// Add more routes if needed

module.exports = router;
