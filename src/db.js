const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin123',
  database: 'shop',
});

// params fill the ? placeholders, mysql escapes them
function query(sql, params, cb) {
  connection.query(sql, params, cb);
}

module.exports = { query };
