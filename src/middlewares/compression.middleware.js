const compression = require('compression');

const COMPRESSION_ENABLE = process.env.COMPRESSION_ENABLE === 'true';
const COMPRESSION_THRESHOLD = parseInt(process.env.COMPRESSION_THRESHOLD, 10) || 1024;
const COMPRESSION_LEVEL = parseInt(process.env.COMPRESSION_LEVEL, 10) || 6;

console.log(`Compression Enabled: ${COMPRESSION_ENABLE}`);

const compressionMiddleware = COMPRESSION_ENABLE ? compression({
    threshold: COMPRESSION_THRESHOLD,
    filter: (req, res) => {
        return req.headers['accept-encoding'] && req.headers['accept-encoding'].includes('gzip');
    },
    level: COMPRESSION_LEVEL
}) : (req, res, next) => {
    next();
};

const enhancedCompressionMiddleware = (req, res, next) => {
    const startTime = Date.now();

    try {
        compressionMiddleware(req, res, () => {
            const duration = Date.now() - startTime;
            next();
        });
    } catch (err) {
        next(err);
    }
};

module.exports = enhancedCompressionMiddleware;
