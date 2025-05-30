//consumerService.js

const redisClient = require('../config/redis'); // ya { redisClient }
const Customer = require('../models/customerModel');
const Order = require('../models/orderModel');

const consumeData = () => {
  setInterval(async () => {
    try {
      const customerData = await redisClient.lPop('customer');
      if (customerData) {
        await Customer.create(JSON.parse(customerData));
        console.log('Posted to MongoDB (Customer)');
      }

      const orderData = await redisClient.lPop('order');
      if (orderData) {
        await Order.create(JSON.parse(orderData));
        console.log('Posted to MongoDB (Order)');
      }
    } catch (error) {
      console.error('Error consuming data:', error);
    }
  }, 2000);
};

consumeData();
