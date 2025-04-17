module.exports.monitorConfig = {
    title: 'Status Monitor | Rest-API',
    theme: 'default.css',
    path: '/status',
    socketPath: '/socket.io',
    spans: [
        {
            interval: 1,
            retention: 60 
        },
        {
            interval: 5,
            retention: 60
        },
        {
            interval: 15,
            retention: 60
        }
    ],
    chartVisibility: {
        cpu: true,
        mem: true,
        load: true,
        eventLoop: true,
        heap: true,
        responseTime: true,
        rps: true,
        statusCodes: true
    }
};
