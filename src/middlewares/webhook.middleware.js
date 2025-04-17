const { webhookService } = require('../service/webhook.service');

async function webhook(req, res, next) {

    if (process.env.WEBHOOK_ENABLE !== 'true') {
        return next();
    }

    // Allow Method
    if (!['PUT', 'POST', 'DELETE'].includes(req.method)) {
        return next();
    }

    const activityData = {
        event: 'activity',
        method: req.method, 
        url: req.originalUrl,
        ip: req.ip,
        userAgent: req.headers['user-agent'],
        statusCode: res.statusCode,
        timestamp: new Date(),
    };

    const webhookUrl = process.env.WEBHOOK_URL;

    if (!webhookUrl) {
        console.error('Webhook URL is not defined');
        return next();
    }

    try {
        await webhookService(webhookUrl, activityData);
    } catch (error) {
        console.error('Error sending activity data to webhook', error, activityData);
    }

    next();
}

module.exports = webhook;
