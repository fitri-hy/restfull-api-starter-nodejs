const compression = require('compression');
const brotli = require('brotli');

const compressionMiddleware = () => {
    return (req, res, next) => {
        const compressionEnabled = process.env.COMPRESSION_ENABLE === 'true';
        
        if (!compressionEnabled) {
            return next();
        }

        const acceptEncoding = req.headers['accept-encoding'] || '';
        
        if (!res.getHeader('Content-Type')) {
            res.setHeader('Content-Type', 'text/html; charset=UTF-8');
        }

        const threshold = parseInt(process.env.COMPRESSION_THRESHOLD) || 512;

        if (acceptEncoding.includes('br')) {
            res.setHeader('Content-Encoding', 'br');
            res.setHeader('Vary', 'Accept-Encoding');

            const originalSend = res.send;
            res.send = (body) => {
                const bufferBody = Buffer.isBuffer(body) ? body : Buffer.from(body);

                const compressedBody = brotli.compress(bufferBody);
                res.setHeader('Content-Length', compressedBody.length);
                res.send = originalSend;
                res.send(compressedBody);
            };
            return next();
        }

        return compression({
            threshold: threshold,
            filter: (req, res) => {
                return true;
            }
        })(req, res, next);
    };
};

module.exports = compressionMiddleware;
