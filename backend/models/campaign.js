const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  rules: [
    {
      field: String,
      operator: String,
      value: mongoose.Schema.Types.Mixed
    }
  ],
  matchedCount: Number,
  createdAt: Date
});

module.exports = mongoose.model('Campaign', campaignSchema);
