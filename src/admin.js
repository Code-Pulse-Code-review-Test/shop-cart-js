const { execFile } = require('child_process');
const fs = require('fs');
const path = require('path');

// keep only the file name so a request cannot reach outside the folder
function safeName(name) {
  const base = path.basename(String(name));
  if (!/^[\w.-]+$/.test(base)) {
    throw new Error('Invalid file name');
  }
  return base;
}

function backupDatabase(fileName, cb) {
  const out = path.join('backups', safeName(fileName));
  execFile('mysqldump', ['-u', 'root', '-padmin123', 'shop', '--result-file=' + out], cb);
}

function readLog(name) {
  return fs.readFileSync(path.join('logs', safeName(name)), 'utf8');
}

function runReport(script, cb) {
  execFile('node', [path.join('reports', safeName(script))], cb);
}

module.exports = { backupDatabase, readLog, runReport };
