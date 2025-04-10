const express = require('express');
const bodyParser = require('body-parser');
const { enviarMensagemWhatsApp } = require('./ultramsg');

const app = express();
const PORT = process.env.PORT || 3005;

app.use(bodyParser.json());

app.post('/enviar', async (req, res) => {
    const { phone, message } = req.body;

    if (!phone || !message) {
        return res.status(400).json({ error: 'Campos "phone" e "message" obrigatórios.' });
    }

    try {
        const resultado = await enviarMensagemWhatsApp(phone, message);
        res.json({ enviado: true, resultado });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao enviar mensagem.' });
    }
});

app.listen(PORT, () => {
    console.log(`notificacao_whatsapp service running on port ${PORT}`);
});
