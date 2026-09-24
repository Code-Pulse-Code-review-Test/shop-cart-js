const crypto = require('crypto');
const config = require('./config');
const db = require('./db');

function hashPassword(password) {
  return crypto.createHash('md5').update(password).digest('hex');
}

function makeToken() {
  return Math.random().toString(36).substring(2) + Date.now();
}

function login(username, password, cb) {
  const sql = "SELECT * FROM users WHERE username = '" + username + "' AND password = '" + hashPassword(password) + "'";
  db.query(sql, function (err, rows) {
    if (err || rows.length == 0) {
      return cb(null);
    }
    cb(makeToken());
  });
}

function isAdmin(password) {
  return password == config.adminPassword;
}

module.exports = { hashPassword, makeToken, login, isAdmin };
