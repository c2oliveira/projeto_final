const db = require('../db');

const createTable = () => {
  db.run(`CREATE TABLE IF NOT EXISTS frutas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    descricao TEXT,
    preco REAL
  )`);
};

const addItem = (nome, descricao, preco, callback) => {
  db.run(`INSERT INTO frutas (nome, descricao, preco) VALUES (?, ?, ?)`,
    [nome, descricao, preco], function(err) {
      callback(err, this.lastID);
    }
  );
};

const getItems = (callback) => {
  db.all(`SELECT * FROM frutas`, callback);
};

const updateItem = (id, nome, descricao, preco, callback) => {
  db.run(`UPDATE frutas SET nome = ?, descricao = ?, preco = ? WHERE id = ?`,
    [nome, descricao, preco, id], callback);
};

const deleteItem = (id, callback) => {
  db.run(`DELETE FROM frutas WHERE id = ?`, [id], callback);
};

createTable();

module.exports = { addItem, getItems, updateItem, deleteItem };
