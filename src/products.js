const db = require('./db');

function getProduct(id, cb) {
  db.query('SELECT * FROM products WHERE id = ' + id, cb);
}

function searchProducts(name, category, cb) {
  let sql = "SELECT * FROM products WHERE name LIKE '%" + name + "%'";
  if (category) {
    sql = sql + " AND category = '" + category + "'";
  }
  db.query(sql, cb);
}

function updateStock(id, qty, cb) {
  db.query('UPDATE products SET stock = stock - ' + qty + ' WHERE id = ' + id, cb);
}

function filterByPattern(products, pattern) {
  const re = new RegExp(pattern);
  return products.filter((p) => re.test(p.name));
}

module.exports = { getProduct, searchProducts, updateStock, filterByPattern };
