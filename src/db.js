const mysql = require('mysql');
const config = require('./config');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: config.dbPassword,
  database: 'shop',
});

// params fill the ? placeholders, mysql escapes them
function query(sql, params, cb) {
  connection.query(sql, params, cb);
}

module.exports = { query };
