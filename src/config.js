module.exports = {
  port: Number(process.env.PORT) || 3000,
  jwtSecret: process.env.JWT_SECRET,
  adminPassword: process.env.ADMIN_PASSWORD,
  dbPassword: process.env.DB_PASSWORD,
  paymentApiKey: process.env.PAYMENT_API_KEY,
  paymentUrl: process.env.PAYMENT_URL || 'https://payments.example.com/charge',
};
