const { performance } = require('perf_hooks');

const suspiciousUserAgents = ['', 'curl', 'wget', 'python-requests', 'postmanruntime'];
const recentRequests = {};

const anomalyDetectionMiddleware = (req, res, next) => {
	
    const anomalyDetectionEnabled = process.env.ANOMALY_ENABLED === 'true';
    const timeWindow = parseInt(process.env.ANOMALY_TIME) || 60000;
    const requestThreshold = parseInt(process.env.ANOMALY_REQUEST) || 100;
    const urlLengthThreshold = parseInt(process.env.ANOMALY_URL_LENGTH) || 2048;

    if (!anomalyDetectionEnabled) {
        return next();
    }

    const ip = req.ip || req.connection.remoteAddress || 'unknown';
    const now = performance.now();

    if (!recentRequests[ip]) recentRequests[ip] = [];
    recentRequests[ip].push(now);
    recentRequests[ip] = recentRequests[ip].filter(ts => now - ts < timeWindow);

    const reqCount = recentRequests[ip].length;

    if (reqCount > requestThreshold) {
        console.warn(`Anomaly detected from IP: ${ip} — ${reqCount} requests/min`);
        return res.status(429).json({ message: 'Too much suspicious activity detected from your IP.' });
    }

    const userAgentRaw = req.headers['user-agent'];
    const userAgent = typeof userAgentRaw === 'string' ? userAgentRaw.toLowerCase() : '';
    if (suspiciousUserAgents.some(ua => userAgent.includes(ua))) {
        console.warn(`Suspicious User-Agent from ${ip}: "${userAgentRaw}"`);
    }

    if (typeof req.url === 'string' && req.url.length > urlLengthThreshold) {
        console.warn(`Excessive URL length from ${ip}: ${req.url.length} chars`);
        return res.status(414).json({ message: 'URL is too long and suspicious.' });
    }

    const allowedMethods = ['GET', 'POST', 'PUT', 'DELETE'];
    if (!allowedMethods.includes(req.method)) {
        console.warn(`Suspicious HTTP method from ${ip}: ${req.method}`);
    }

    next();
};

module.exports = anomalyDetectionMiddleware;
