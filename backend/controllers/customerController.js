//consumerController.js

const Customer = require('../models/customerModel');
const { addToStream } = require("../services/redisService");
const logger = require('../utils/logger');

exports.createCustomer = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    let customer = await Customer.findOne({ email, phone });

    if (customer) {
      customer.visits += 1;
      customer.lastActive = Date.now();
      await customer.save();

      await addToStream('customers_stream', {
        id: customer._id.toString(),
        name: customer.name,
        email: customer.email,
        type: 'existing'
      });

      logger.info('Existing customer updated: visits incremented', {
        customerId: customer._id.toString(),
        timestamp: new Date().toISOString()
      });

      return res.status(200).json({ message: 'Existing customer updated', customer });
    }

    customer = await Customer.create({ name, email, phone });

    await addToStream('customers_stream', {
      id: customer._id.toString(),
      name: customer.name,
      email: customer.email,
      type: 'new'
    });

    logger.info('New customer posted: Data went to MongoDB and Redis', {
      customerId: customer._id.toString(),
      timestamp: new Date().toISOString()
    });

    res.status(201).json({ message: 'New customer created', customer });
  } catch (error) {
    logger.error('Error in createCustomer', { message: error.message });
    res.status(500).json({ error: error.message });
  }
};

exports.getCustomers = async (req, res) => {
  try {
    const data = await Customer.find();
    logger.info('GET /customers called', { timestamp: new Date().toISOString() });
    res.json(data);
  } catch (error) {
    logger.error('Error in getCustomers', { message: error.message });
    res.status(500).json({ error: error.message });
  }
};

exports.updateCustomer = async (req, res) => {
  try {
    const updated = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    logger.info(`Customer updated: ${req.params.id}`, { timestamp: new Date().toISOString() });
    res.json(updated);
  } catch (error) {
    logger.error('Error in updateCustomer', { message: error.message });
    res.status(500).json({ error: error.message });
  }
};

exports.deleteCustomer = async (req, res) => {
  try {
    await Customer.findByIdAndDelete(req.params.id);
    logger.info(`Customer deleted: ${req.params.id}`, { timestamp: new Date().toISOString() });
    res.send('Customer deleted');
  } catch (error) {
    logger.error('Error in deleteCustomer', { message: error.message });
    res.status(500).json({ error: error.message });
  }
};
