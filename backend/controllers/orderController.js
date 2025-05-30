//orderController.js

const { addToStream } = require('../services/redisService');
const Order = require('../models/orderModel');
const Customer = require('../models/customerModel');
const logger = require('../utils/logger');

exports.createOrder = async (req, res) => {
  try {
    const { name, email, phone, product, amount } = req.body;

    // Step 1: Redis stream me daalo
    await addToStream('orders_stream', {
      customerEmail: email,
      product,
      amount: amount.toString()
    });

    // Step 2: Check if customer already exists
    let customer = await Customer.findOne({ email });

    if (customer) {
      customer.visits += 1;
      customer.spend += amount;
      customer.lastActive = new Date();
      await customer.save();
    } else {
      customer = await Customer.create({
        name,
        email,
        phone,
        visits: 1,
        spend: amount,
        lastActive: new Date()
      });
    }

    // Step 3: MongoDB me order save karo
    const order = await Order.create({
      customerId: customer._id,
      product,
      amount
    });

    logger.info('Order processed with customer update');
    res.status(201).json(order);
  } catch (error) {
    logger.error('Error creating order: ' + error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const data = await Order.find();
    logger.info('GET /orders called');
    res.json(data);
  } catch (error) {
    logger.error('Error fetching orders: ' + error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const updated = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    logger.info(`Order updated with ID: ${req.params.id}`);
    res.json(updated);
  } catch (error) {
    logger.error('Error updating order: ' + error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    logger.info(`Order deleted with ID: ${req.params.id}`);
    res.send('Order deleted');
  } catch (error) {
    logger.error('Error deleting order: ' + error.message);
    res.status(500).json({ error: error.message });
  }
};
