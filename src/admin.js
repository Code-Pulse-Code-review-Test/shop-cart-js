const { exec } = require('child_process');
const fs = require('fs');

function backupDatabase(fileName, cb) {
  exec('mysqldump -u root -padmin123 shop > backups/' + fileName, cb);
}

function readLog(name) {
  return fs.readFileSync('logs/' + name, 'utf8');
}

function runReport(script, cb) {
  exec('node reports/' + script, cb);
}

module.exports = { backupDatabase, readLog, runReport };
