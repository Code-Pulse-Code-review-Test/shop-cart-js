const carts = {};

function addToCart(userId, product, qty) {
  if (!carts[userId]) {
    carts[userId] = [];
  }
  carts[userId].push({ product, qty });
}

// percent comes from the admin page, e.g. 10 for 10% off
function applyDiscount(total, percent) {
  const value = Number(percent);
  if (!Number.isFinite(value) || value < 0 || value > 100) {
    throw new Error('Discount must be a percentage between 0 and 100');
  }
  return (total * (100 - value)) / 100;
}

function cartTotal(userId, discountPercent) {
  let total = 0;
  const items = carts[userId] || [];
  for (let i = 0; i < items.length; i++) {
    total = total + items[i].product.price * items[i].qty;
  }
  if (discountPercent) {
    total = applyDiscount(total, discountPercent);
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
