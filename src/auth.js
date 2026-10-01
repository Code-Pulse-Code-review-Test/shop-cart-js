const crypto = require('crypto');
const config = require('./config');
const db = require('./db');

function hashPassword(password) {
  return crypto.createHash('md5').update(password).digest('hex');
}

function makeToken() {
  return crypto.randomBytes(32).toString('hex');
}

function login(username, password, cb) {
  const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
  db.query(sql, [username, hashPassword(password)], function (err, rows) {
    if (err || rows.length === 0) {
      return cb(null);
    }
    cb(makeToken());
  });
}

function isAdmin(password) {
  return password == config.adminPassword;
}

module.exports = { hashPassword, makeToken, login, isAdmin };
