const redis = require('redis');
const util = require('util');

const REDIS_ENABLED = process.env.REDIS_CACHE_ENABLE === 'true';
const DEFAULT_TTL = parseInt(process.env.REDIS_TTL, 10) || 3600;

let redisClient;

if (REDIS_ENABLED) {
    redisClient = redis.createClient({
        socket: {
            host: process.env.REDIS_HOST || 'localhost',
            port: process.env.REDIS_PORT || 6379,
        },
        legacyMode: true,
    });

    redisClient.connect().catch((err) => {
        console.error('Redis connection error:', err);
    });

    redisClient.get = util.promisify(redisClient.get);
    redisClient.setex = util.promisify(redisClient.setEx || redisClient.setex);
}

const getFromCache = async (key) => {
    if (!REDIS_ENABLED) return null;

    try {
        const data = await redisClient.get(key);
        return data ? JSON.parse(data) : null;
    } catch (err) {
        console.error('Error getting data from Redis:', err);
        throw err;
    }
};

const saveToCache = async (key, data, ttl = DEFAULT_TTL) => {
    if (!REDIS_ENABLED) return;

    try {
        await redisClient.setex(key, ttl, JSON.stringify(data));
    } catch (err) {
        console.error('Error saving data to Redis:', err);
        throw err;
    }
};

module.exports = {
    getFromCache,
    saveToCache,
    DEFAULT_TTL
};