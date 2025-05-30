const express = require('express');
const router = express.Router();
const segmentController = require('../controllers/segmentController');

router.post('/count', segmentController.getAudienceCount);
router.post('/save', segmentController.saveSegment);

module.exports = router;
