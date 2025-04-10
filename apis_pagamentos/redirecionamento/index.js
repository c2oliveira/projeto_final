const express = require('express');
const app = express();
const PORT = process.env.PORT || 3004;

app.get('/', (req, res) => {
    const { status, transactionId } = req.query;
    let redirectUrl = '';
    
    if (status === 'success') {
        redirectUrl = 'https://seudominio.com/sucesso';
    } else if (status === 'cancel') {
        redirectUrl = 'https://seudominio.com/cancelado';
    } else {
        redirectUrl = 'https://seudominio.com';
    }
    
    console.log(`Transação ${transactionId} com status: ${status}`);
    
    res.redirect(redirectUrl);
});

app.listen(PORT, () => {
    console.log(`redirecionamento service running on port ${PORT}`);
});
