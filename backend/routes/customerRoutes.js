//cusomerRoutes.js

const express = require('express');
const router = express.Router();
const controller = require('../controllers/customerController');

router.post('/', controller.createCustomer);
router.get('/', controller.getCustomers);
router.put('/:id', controller.updateCustomer);
router.delete('/:id', controller.deleteCustomer);

module.exports = router;
