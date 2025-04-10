const db = require('../db');

const createTable = () => {
  db.run(`CREATE TABLE IF NOT EXISTS sementes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    descricao TEXT,
    preco REAL
  )`);
};

const addItem = (nome, descricao, preco, callback) => {
  db.run(`INSERT INTO sementes (nome, descricao, preco) VALUES (?, ?, ?)`,
    [nome, descricao, preco], function(err) {
      callback(err, this.lastID);
    }
  );
};

const getItems = (callback) => {
  db.all(`SELECT * FROM sementes`, callback);
};

const updateItem = (id, nome, descricao, preco, callback) => {
  db.run(`UPDATE sementes SET nome = ?, descricao = ?, preco = ? WHERE id = ?`,
    [nome, descricao, preco, id], callback);
};

const deleteItem = (id, callback) => {
  db.run(`DELETE FROM sementes WHERE id = ?`, [id], callback);
};

createTable();

module.exports = { addItem, getItems, updateItem, deleteItem };
