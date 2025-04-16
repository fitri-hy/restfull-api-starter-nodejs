const sequelize = require('../config/db.config');
const Bull = require('bull');

const gracefulShutdown = (server) => {
    console.log('Received SIGINT or SIGTERM. Shutting down gracefully...');

    server.close(() => {
        console.log('Closed out remaining connections.');

        sequelize.close()
            .then(() => {
                console.log('Sequelize connection closed.');
            })
            .catch((err) => {
                console.error('Error closing Sequelize connection:', err);
            });

        const taskQueue = Bull('taskQueue');
        taskQueue.close()
            .then(() => {
                console.log('Task queue closed.');
            })
            .catch((err) => {
                console.error('Error closing task queue:', err);
            });

        process.exit(0);
    });

    setTimeout(() => {
        console.error('Forced shutdown due to hanging...');
        process.exit(1);
    }, 10000);
};

module.exports = gracefulShutdown;
