//orderModel.js

const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerId: String,
  product: String,
  amount: Number
});

module.exports = mongoose.model('Order', orderSchema);
