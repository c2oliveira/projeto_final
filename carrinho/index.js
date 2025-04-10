const express = require('express');
const bodyParser = require('body-parser');
const clientInfo = require('./recibo/client_info');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());


let cart = [];


app.get('/', (req, res) => {
  res.json({ message: 'Carrinho atual', cart });
});


app.post('/add', (req, res) => {
  const { id, name, price, quantity } = req.body;
  if (!id || !name || !price || !quantity) {
    return res.status(400).json({ error: 'Campos id, name, price e quantity são obrigatórios.' });
  }
  cart.push({ id, name, price, quantity });
  res.json({ message: 'Item adicionado com sucesso.', cart });
});


app.post('/remove', (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ error: 'Campo id é obrigatório.' });
  }
  cart = cart.filter(item => item.id !== id);
  res.json({ message: 'Item removido com sucesso.', cart });
});


app.get('/recibo', (req, res) => {
  const { name, email, address } = req.query;
  if (!name || !email || !address) {
    return res.status(400).json({ error: 'Campos name, email e address são obrigatórios para gerar o recibo.' });
  }
  const clientDetails = clientInfo.generateClientInfo({ name, email, address });
  let receipt = 'Recibo de Compra\n';
  receipt += '----------------------\n';
  receipt += clientDetails + '\n';
  receipt += 'Itens:\n';
  let total = 0;
  cart.forEach(item => {
    receipt += `${item.name} - ${item.quantity} x R$${parseFloat(item.price).toFixed(2)}\n`;
    total += parseFloat(item.price) * item.quantity;
  });
  receipt += '----------------------\n';
  receipt += `Total: R$${total.toFixed(2)}\n`;
  res.json({ receipt });
});


app.post('/clear', (req, res) => {
  cart = [];
  res.json({ message: 'Carrinho esvaziado.' });
});

app.listen(PORT, () => {
  console.log(`Carrinho backend rodando na porta ${PORT}`);
});
