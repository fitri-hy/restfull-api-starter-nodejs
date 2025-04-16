const helmet = require('helmet');
const cors = require('cors');

const allowedOrigins = process.env.CORS_ORIGIN?.split(',') || ['*'];

const securityMiddleware = [

    helmet({
        crossOriginResourcePolicy: { policy: 'cross-origin' },
    }),

    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true,
    }),
];

module.exports = securityMiddleware;
