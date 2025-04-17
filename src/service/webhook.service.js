const axios = require('axios');

async function webhookService(webhookUrl, data) {
    try {
        const response = await axios.post(webhookUrl, data);
        console.log('Webhook sent successfully');
    } catch (error) {
        console.error('Error sending webhook:', error);
    }
}

module.exports = { webhookService };
