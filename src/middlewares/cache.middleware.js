const { getFromCache } = require('../service/redis.service');

const cacheMiddleware = async (req, res, next) => {
    const { key } = req.params;

    try {
        const cachedData = await getFromCache(key);
        if (cachedData) {
            console.log(`Cache hit for key: ${key}`);
            return res.json(cachedData);
        }

        console.log(`Cache miss for key: ${key}`);
        next();
    } catch (err) {
        console.error('Redis cache middleware error:', err);
        next();
    }
};

module.exports = cacheMiddleware;
