const axios = require('axios');

const instanceId = process.env.ULTRAMSG_INSTANCE_ID || 'instanceXXXX';
const token = process.env.ULTRAMSG_TOKEN || 'your_token_here';

async function enviarMensagemWhatsApp(phone, message) {
    const url = `https://api.ultramsg.com/${instanceId}/messages/chat`;

    const payload = {
        token,
        to: phone,
        body: message
    };

    try {
        const response = await axios.post(url, payload);
        return response.data;
    } catch (error) {
        console.error('Erro ao enviar mensagem:', error.response?.data || error.message);
        throw new Error('Falha no envio do WhatsApp');
    }
}

module.exports = { enviarMensagemWhatsApp };
