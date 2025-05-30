const Customer = require('../models/customerModel');
const Segment = require('../models/segmentModel');

exports.getAudienceCount = async (req, res) => {
  try {
    const conditions = req.body;
    const count = await Customer.countDocuments(conditions);
    res.json({ count });
  } catch (error) {
    console.error("Count Error:", error);
    res.status(500).json({ message: "Error fetching count" });
  }
};

exports.saveSegment = async (req, res) => {
  try {
    const segment = new Segment(req.body);
    await segment.save();
    res.status(201).json({ message: "Segment saved successfully" });
  } catch (error) {
    console.error("Save Error:", error);
    res.status(500).json({ message: "Error saving segment" });
  }
};
