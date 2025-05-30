const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  visits: { type: Number, default: 0 },
  spend: { type: Number, default: 0 },
  lastActive: { type: Date },
});

// Check if model already exists to avoid OverwriteModelError
const Customer = mongoose.models.Customer || mongoose.model('Customer', customerSchema);

module.exports = Customer;
