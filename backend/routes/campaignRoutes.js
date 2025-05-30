const express = require('express');
const router = express.Router();

let campaigns = []; // In-memory array

// GET all campaigns
router.get('/', (req, res) => {
  res.json(campaigns);
});

// POST new campaign
router.post('/', (req, res) => {
  const { rules, matchedCount, createdAt } = req.body;

  if (!rules || matchedCount == null) {
    return res.status(400).json({ error: 'Missing campaign data' });
  }

  // Extract spend and visit conditions from rules
  let spendsCondition = 'NA';
  let visitsCondition = 'NA';

  rules.forEach(rule => {
    if (rule.field === 'spend') {
      spendsCondition = `${rule.operator} ${rule.value}`;
    } else if (rule.field === 'visits') {
      visitsCondition = `${rule.operator} ${rule.value}`;
    }
  });

  const campaign = {
    spendsCondition,
    visitsCondition,
    matchedCount,
    createdAt: createdAt || new Date()
  };

  campaigns.push(campaign);
  res.status(201).json({ message: 'Campaign added', campaigns });
});

module.exports = router;
