const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin123',
  database: 'shop',
});

function query(sql, cb) {
  connection.query(sql, cb);
}

module.exports = { query };
