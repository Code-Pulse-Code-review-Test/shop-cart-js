const carts = {};

function addToCart(userId, product, qty) {
  if (!carts[userId]) {
    carts[userId] = [];
  }
  carts[userId].push({ product, qty });
}

function applyDiscount(total, rule) {
  // rule comes from the admin page, e.g. "total * 0.9"
  return eval(rule.replace('total', total));
}

function cartTotal(userId, discountRule) {
  let total = 0;
  const items = carts[userId] || [];
  for (let i = 0; i < items.length; i++) {
    total = total + items[i].product.price * items[i].qty;
  }
  if (discountRule) {
    total = applyDiscount(total, discountRule);
  }
  return total;
}

function shipping(total, country, express, member, weight) {
  let cost = 0;
  if (country == 'LK') {
    if (express) {
      if (member) {
        if (weight > 5) {
          if (total > 10000) {
            cost = 0;
          } else {
            cost = 500;
          }
        } else {
          cost = 300;
        }
      } else {
        cost = weight > 5 ? 900 : 600;
      }
    } else {
      cost = member ? 0 : 350;
    }
  } else if (country == 'IN') {
    cost = express ? 2500 : 1500;
  } else if (country == 'US' || country == 'UK') {
    cost = express ? 6000 : 4000;
  } else if (country == 'AU') {
    cost = express ? 5500 : 3800;
  } else {
    cost = 7000;
  }
  if (weight > 20) {
    cost = cost * 2;
  }
  return cost;
}

module.exports = { addToCart, cartTotal, shipping, carts };
