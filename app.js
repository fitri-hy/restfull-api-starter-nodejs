require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const expressStatusMonitor = require('express-status-monitor');

const monitorConfig = require('./src/service/monitor-health.service');
const gracefulShutdown = require('./src/service/gracefulShutdown.service'); 
const securityMiddleware = require('./src/middlewares/security.middleware');
const apiKeyMiddleware = require('./src/middlewares/apiKey.middleware');
const rateLimitMiddleware = require('./src/middlewares/rateLimit.middleware');
const compressionMiddleware = require('./src/middlewares/compression.middleware');
const { responseTimeMiddleware, sqlQueryLoggingMiddleware } = require('./src/middlewares/profiling.middleware');

const app = express();
app.use(compressionMiddleware());

// Health Check & Monitoring
app.use(expressStatusMonitor(monitorConfig));

// Middleware
app.use(morgan('dev'));
app.use(...securityMiddleware);
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Profiling Middleware (in development only)
if (process.env.NODE_ENV === 'development') {
    app.use(responseTimeMiddleware);
    app.use(sqlQueryLoggingMiddleware);
}

// Routes
const apiRoutes = require('./src/routes/api.route');
app.use('/api/v1', apiKeyMiddleware, rateLimitMiddleware, apiRoutes);

// Error Handling
const errorHandler = require('./src/middlewares/errorHandler.middleware');
app.use(errorHandler);

// Start Server
const host = process.env.HOST || localhost;
const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// Graceful Shutdown
process.on('SIGINT', () => gracefulShutdown(server));
process.on('SIGTERM', () => gracefulShutdown(server)); 