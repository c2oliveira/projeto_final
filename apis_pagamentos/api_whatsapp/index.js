const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

app.get('/whatsapp', (req, res) => {
    const { phone, message } = req.query;
    if (!phone || !message) {
        return res.status(400).json({ error: 'Parâmetros "phone" e "message" são obrigatórios.' });
    }
    const encodedMessage = encodeURIComponent(message);
    const whatsappLink = `https://wa.me/${phone}?text=${encodedMessage}`;
    res.json({ whatsappLink });
});

app.listen(PORT, () => {
    console.log(`api_whatsapp service running on port ${PORT}`);
});
