const apiKeyMiddleware = (req, res, next) => {
    if (process.env.API_KEY_ENABLE !== 'true') {
        return next();
    }

    const userKey = req.header('x-api-key');

    if (!userKey || userKey !== process.env.API_KEY) {
        return res.status(401).json({ message: 'Unauthorized: Invalid API Key' });
    }

    next();
};

module.exports = apiKeyMiddleware;
