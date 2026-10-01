const crypto = require('crypto');
const config = require('./config');
const db = require('./db');

// stored as salt:hash
function hashPassword(password, salt = crypto.randomBytes(16).toString('hex')) {
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return salt + ':' + hash;
}

function checkPassword(password, stored) {
  const [salt, hash] = String(stored).split(':');
  if (!salt || !hash) return false;
  const expected = Buffer.from(hash, 'hex');
  const actual = crypto.scryptSync(password, salt, 64);
  return expected.length === actual.length && crypto.timingSafeEqual(expected, actual);
}

function makeToken() {
  return crypto.randomBytes(32).toString('hex');
}

function login(username, password, cb) {
  db.query('SELECT * FROM users WHERE username = ?', [username], function (err, rows) {
    if (err || rows.length === 0 || !checkPassword(password, rows[0].password)) {
      return cb(null);
    }
    cb(makeToken());
  });
}

function isAdmin(password) {
  if (!config.adminPassword || typeof password !== 'string') return false;
  const a = crypto.createHash('sha256').update(password).digest();
  const b = crypto.createHash('sha256').update(config.adminPassword).digest();
  return crypto.timingSafeEqual(a, b);
}

module.exports = { hashPassword, checkPassword, makeToken, login, isAdmin };
