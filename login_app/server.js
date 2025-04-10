const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'minha_senha_secreta',
    resave: false,
    saveUninitialized: true
}));

// Usuários de exemplo
const users = {
    admin: { username: 'admin', password: 'admin123', role: 'admin' },
    client: { username: 'client', password: 'client123', role: 'client' }
};

app.set('view engine', 'ejs');

// Rota para exibir o formulário de login
app.get('/', (req, res) => {
    res.render('login', { error: null });
});

// Rota para processar o login
app.post('/login', (req, res) => {
    const { username, password, role } = req.body;
    if (username === users[role].username && password === users[role].password) {
        req.session.user = { username, role };
        if (role === 'admin') {
            res.redirect('/admin');
        } else {
            res.redirect('/client');
        }
    } else {
        res.render('login', { error: 'Credenciais inválidas' });
    }
});

// Dashboard para admin
app.get('/admin', (req, res) => {
    if (req.session.user && req.session.user.role === 'admin') {
        res.render('admin_dashboard', { user: req.session.user });
    } else {
        res.redirect('/');
    }
});

// Dashboard para cliente
app.get('/client', (req, res) => {
    if (req.session.user && req.session.user.role === 'client') {
        res.render('client_dashboard', { user: req.session.user });
    } else {
        res.redirect('/');
    }
});

// Logout (encerra a sessão e volta à tela de login)
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
