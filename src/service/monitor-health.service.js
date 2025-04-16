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
    },
    healthChecks: [
        {
            protocol: 'http',
            host: 'localhost',
            path: '/admin/health/ex1',  // Path for the first health check
            port: '3000'                // Port for the first health check
        },
        {
            protocol: 'http',
            host: 'localhost',
            path: '/admin/health/ex2',  // Path for the second health check
            port: '3000'                // Port for the second health check
        }
    ]
};
