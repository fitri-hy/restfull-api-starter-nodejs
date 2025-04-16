const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const env = process.env.NODE_ENV || 'development';

    if (env === 'development') {
        console.error('[Error]', err);
    } else {
        console.error(`[${new Date().toISOString()}] ${err.name}: ${err.message}`);
    }

    const clientMessage = () => {
        // Input Validation
        if (err.isJoi) {
            return err.details?.[0]?.message || 'Invalid input';
        }

        // Sequelize Unique Constraint
        if (err.name === 'SequelizeUniqueConstraintError') {
            return 'Data has been registered.';
        }

        // Sequelize Validation Error
        if (err.name === 'SequelizeValidationError') {
            return err.errors?.[0]?.message || 'Validation Error';
        }

        // Auth Error
        if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
            return 'Token is invalid or expired';
        }

        // Default Message
        return err.message || 'Something went wrong!';
    };

    res.status(statusCode).json({
        success: false,
        message: clientMessage(),
        ...(env === 'development' && {
            stack: err.stack,
            error: err,
        }),
    });
};

module.exports = errorHandler;
