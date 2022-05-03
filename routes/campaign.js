const express = require('express');

const { body } = require('express-validator');

const campaignController = require('../controllers/campaign');

const router = express.Router();





router.post('/createCampaign', campaignController.createNewCampaignNew);

module.exports = router;