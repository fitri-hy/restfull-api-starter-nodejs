const { performance } = require('perf_hooks');
const { Sequelize } = require('sequelize');
const sequelize = require('../config/db.config');

const responseTimeMiddleware = (req, res, next) => {
    const start = performance.now();

    res.on('finish', () => {
        const end = performance.now();
        const responseTime = (end - start).toFixed(3);
        if (!res.headersSent) {
            res.setHeader('X-Response-Time', `${responseTime}ms`);
        }
    });

    next();
};

const sqlQueryLoggingMiddleware = (req, res, next) => {
    if (process.env.NODE_ENV !== 'development') {
        return next();
    }

    let sqlQueriesCount = 0;

    const originalQuery = sequelize.query;
    sequelize.query = async (...args) => {
        sqlQueriesCount++;
        return originalQuery.apply(sequelize, args);
    };

    res.on('finish', () => {
        if (!res.headersSent) {
            res.setHeader('X-SQL-Queries', sqlQueriesCount);
        }
    });

    next();
};

module.exports = {
    responseTimeMiddleware,
    sqlQueryLoggingMiddleware
};
