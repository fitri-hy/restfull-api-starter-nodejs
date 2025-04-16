const rateLimit = require('express-rate-limit');

const rateLimitMiddleware = rateLimit({
	
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 86400000,
    max: process.env.RATE_LIMIT_MAX === 'Infinity' ? Infinity : parseInt(process.env.RATE_LIMIT_MAX),
    message: 'Too many requests, please try again later.',
    
    keyGenerator: (req, res) => {
        return req.header('x-api-key') || req.ip;
    },

    handler: (req, res) => {
        return res.status(429).json({
            message: 'Rate limit exceeded for your API key. Please wait and try again.',
        });
    },
});

module.exports = rateLimitMiddleware;
