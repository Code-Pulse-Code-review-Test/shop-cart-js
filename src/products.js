const db = require('./db');

function getProduct(id, cb) {
  db.query('SELECT * FROM products WHERE id = ?', [id], cb);
}

function searchProducts(name, category, cb) {
  let sql = 'SELECT * FROM products WHERE name LIKE ?';
  const params = ['%' + name + '%'];
  if (category) {
    sql = sql + ' AND category = ?';
    params.push(category);
  }
  db.query(sql, params, cb);
}

function updateStock(id, qty, cb) {
  db.query('UPDATE products SET stock = stock - ? WHERE id = ?', [qty, id], cb);
}

// plain text match, a regex from the query string could hang the server
function filterByName(products, text) {
  const needle = String(text).toLowerCase();
  return products.filter((p) => p.name.toLowerCase().includes(needle));
}

module.exports = { getProduct, searchProducts, updateStock, filterByName };
