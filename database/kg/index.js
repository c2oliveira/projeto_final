const db = require('../db');

const createTable = () => {
  db.run(`CREATE TABLE IF NOT EXISTS kg (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    descricao TEXT,
    preco REAL
  )`);
};

const addItem = (nome, descricao, preco, callback) => {
  db.run(`INSERT INTO kg (nome, descricao, preco) VALUES (?, ?, ?)`,
    [nome, descricao, preco], function(err) {
      callback(err, this.lastID);
    }
  );
};

const getItems = (callback) => {
  db.all(`SELECT * FROM kg`, callback);
};

const updateItem = (id, nome, descricao, preco, callback) => {
  db.run(`UPDATE kg SET nome = ?, descricao = ?, preco = ? WHERE id = ?`,
    [nome, descricao, preco, id], callback);
};

const deleteItem = (id, callback) => {
  db.run(`DELETE FROM kg WHERE id = ?`, [id], callback);
};

createTable();

module.exports = { addItem, getItems, updateItem, deleteItem };
