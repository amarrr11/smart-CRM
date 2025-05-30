//segmentModel.js

const mongoose = require('mongoose');

const segmentSchema = new mongoose.Schema({
  name: String,
  rules: Object, // e.g., { spend: { $gt: 10000 }, visits: { $lt: 3 } }
  audienceCount: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Segment', segmentSchema);
