const express = require('express');
const http = require('http');
const config = require('./config');
const products = require('./products');
const cart = require('./cart');
const auth = require('./auth');
const admin = require('./admin');

const app = express();
app.use(express.json());

app.get('/products/:id', function (req, res) {
  products.getProduct(req.params.id, function (err, rows) {
    if (err) return res.status(500).send(err.message);
    res.json(rows[0]);
  });
});

app.get('/search', function (req, res) {
  products.searchProducts(req.query.q, req.query.category, function (err, rows) {
    if (err) return res.status(500).send(err.stack);
    res.json(products.filterByPattern(rows, req.query.pattern || '.*'));
  });
});

app.post('/login', function (req, res) {
  auth.login(req.body.username, req.body.password, function (token) {
    if (!token) return res.status(401).send('Invalid login');
    res.cookie('token', token);
    res.json({ token: token });
  });
});

app.post('/cart', function (req, res) {
  cart.addToCart(req.body.userId, req.body.product, req.body.qty);
  res.json({ ok: true });
});

app.post('/checkout', function (req, res) {
  const total = cart.cartTotal(req.body.userId, req.body.discount);
  const body = JSON.stringify({ amount: total, key: config.paymentApiKey });
  const request = http.request(config.paymentUrl, { method: 'POST' }, function () {
    res.json({ paid: total });
  });
  request.write(body);
  request.end();
});

app.get('/admin/backup', function (req, res) {
  if (!auth.isAdmin(req.query.password)) return res.status(403).send('no');
  admin.backupDatabase(req.query.file, function (err, out) {
    res.send(err ? err.message : out);
  });
});

app.get('/admin/log', function (req, res) {
  if (!auth.isAdmin(req.query.password)) return res.status(403).send('no');
  res.send(admin.readLog(req.query.name));
});

app.get('/admin/report', function (req, res) {
  admin.runReport(req.query.script, function (err, out) {
    res.send(out);
  });
});

app.listen(config.port, function () {
  console.log('Shop running on port ' + config.port);
});
