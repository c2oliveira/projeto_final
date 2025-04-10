const db = require('../db');

const createTable = () => {
  db.run(`CREATE TABLE IF NOT EXISTS precos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    item TEXT NOT NULL,
    valor REAL
  )`);
};

const addPrice = (item, valor, callback) => {
  db.run(`INSERT INTO precos (item, valor) VALUES (?, ?)`,
    [item, valor], function(err) {
      callback(err, this.lastID);
    }
  );
};

const getPrices = (callback) => {
  db.all(`SELECT * FROM precos`, callback);
};

const updatePrice = (id, item, valor, callback) => {
  db.run(`UPDATE precos SET item = ?, valor = ? WHERE id = ?`,
    [item, valor, id], callback);
};

const deletePrice = (id, callback) => {
  db.run(`DELETE FROM precos WHERE id = ?`, [id], callback);
};

createTable();

module.exports = { addPrice, getPrices, updatePrice, deletePrice };
