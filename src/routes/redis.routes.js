const express = require('express');
const router = express.Router();
const { saveToCache, DEFAULT_TTL } = require('../service/redis.service');

router.get('/:key', async (req, res) => {
    const { key } = req.params;

    const data = {
        key,
        message: `Data for key "${key}" generated at ${new Date().toISOString()}`
    };

    await saveToCache(key, data, DEFAULT_TTL);

    res.json(data);
});

module.exports = router;
