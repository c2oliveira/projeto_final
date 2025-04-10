const express = require('express');
const QRCode = require('qrcode');
const app = express();
const PORT = process.env.PORT || 3003;

app.use(express.json());

app.get('/generate', (req, res) => {
    const { text } = req.query;
    if (!text) {
        return res.status(400).json({ error: 'O parâmetro "text" é obrigatório.' });
    }
    QRCode.toDataURL(text, { errorCorrectionLevel: 'H' }, (err, url) => {
        if (err) {
            console.error('Erro ao gerar QR Code:', err);
            return res.status(500).json({ error: 'Erro ao gerar QR Code.' });
        }
        res.json({ qrcode: url });
    });
});

app.listen(PORT, () => {
    console.log(`qrcode_gerador service running on port ${PORT}`);
});
