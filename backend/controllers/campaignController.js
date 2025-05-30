const Customer = require('../models/customerModel');
const Campaign = require('../models/campaign');
const logger = require('../utils/logger');

exports.createCampaign = async (req, res) => {
  try {
    const { rules, matchedCount } = req.body;
    
    // Create campaign
    const campaign = await Campaign.create({
      rules,
      matchedCount,
      createdAt: new Date()
    });

    logger.info(`Campaign created with ID: ${campaign._id}`);
    res.status(201).json({ message: 'Campaign created successfully', campaign });
  } catch (error) {
    logger.error('Error in createCampaign:', error);
    res.status(500).json({ error: error.message });
  }
};