const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/auth');
const Audience = require('../models/customerModel');

router.post('/', isAuthenticated, async (req, res) => {
  const { rules } = req.body;

  if (!rules || !Array.isArray(rules)) {
    return res.status(400).json({ error: 'Rules missing or invalid' });
  }

  // MongoDB filter banate hain based on rules
  const mongoFilters = {};

  rules.forEach(({ field, operator, value }) => {
    if (field !== "spend" && field !== "visits") return; // ignore unknown fields

    if (operator === '>') {
      mongoFilters[field] = { $gt: value };
    } else if (operator === '<') {
      mongoFilters[field] = { $lt: value };
    } else if (operator === '=') {
      mongoFilters[field] = value;
    }
  });

  try {
    const matchedAudience = await Audience.find(mongoFilters);
    res.json({ matchedCount: matchedAudience.length });
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;