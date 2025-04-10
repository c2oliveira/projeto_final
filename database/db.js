const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) {
    console.error('Erro ao conectar com o SQLite:', err.message);
  } else {
    console.log('Conectado ao banco de dados SQLite.');
  }
});

module.exports = db;
