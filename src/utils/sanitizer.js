const xss = require('xss');

const sanitizeInput = (data) => {
    if (typeof data === 'string') {
        return xss(data);
    }

    if (Array.isArray(data)) {
        return data.map(item => sanitizeInput(item));
    }

    if (typeof data === 'object' && data !== null) {
        const sanitized = {};
        for (const key in data) {
            sanitized[key] = sanitizeInput(data[key]);
        }
        return sanitized;
    }

    return data;
};

module.exports = sanitizeInput;
