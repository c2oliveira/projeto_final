const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3002;

app.use(bodyParser.json());

const PAGSEGURO_EMAIL = process.env.PAGSEGURO_EMAIL || 'seu-email@exemplo.com';
const PAGSEGURO_TOKEN = process.env.PAGSEGURO_TOKEN || 'token_de_exemplo';
const PAGSEGURO_ENDPOINT = 'https://ws.pagseguro.uol.com.br/v2/checkout/';

app.post('/pagseguro/create', async (req, res) => {
    const { orderId, items, sender, shipping } = req.body;
    if (!orderId || !items || !sender) {
        return res.status(400).json({ error: 'Dados insuficientes: "orderId", "items" e "sender" são obrigatórios.' });
    }
    
    const params = new URLSearchParams();
    params.append('email', PAGSEGURO_EMAIL);
    params.append('token', PAGSEGURO_TOKEN);
    params.append('currency', 'BRL');
    
    items.forEach((item, index) => {
        const i = index + 1;
        params.append(`itemId${i}`, item.id);
        params.append(`itemDescription${i}`, item.description);
        params.append(`itemAmount${i}`, parseFloat(item.amount).toFixed(2));
        params.append(`itemQuantity${i}`, item.quantity);
    });
    
    params.append('senderName', sender.name);
    params.append('senderEmail', sender.email);
    if (sender.phone) {
        params.append('senderAreaCode', sender.phone.substr(0,2));
        params.append('senderPhone', sender.phone.substr(2));
    }
    
    if (shipping && shipping.address) {
        const addr = shipping.address;
        params.append('shippingAddressStreet', addr.street);
        params.append('shippingAddressNumber', addr.number);
        params.append('shippingAddressComplement', addr.complement || '');
        params.append('shippingAddressDistrict', addr.district);
        params.append('shippingAddressPostalCode', addr.postalCode);
        params.append('shippingAddressCity', addr.city);
        params.append('shippingAddressState', addr.state);
        params.append('shippingAddressCountry', addr.country || 'BRA');
    }

    try {
        // Integração real com PagSeguro: descomente a chamada abaixo e ajuste conforme necessário.
        // const response = await axios.post(PAGSEGURO_ENDPOINT, params);
        // res.json(response.data);
        const fakeResponse = {
            checkoutCode: 'FAKE_CHECKOUT_CODE_1234567890',
            orderId,
            items
        };
        res.json(fakeResponse);
    } catch (error) {
        console.error('Erro na integração com PagSeguro:', error);
        res.status(500).json({ error: 'Erro na integração com PagSeguro.' });
    }
});

app.listen(PORT, () => {
    console.log(`api_pagseguro service running on port ${PORT}`);
});
