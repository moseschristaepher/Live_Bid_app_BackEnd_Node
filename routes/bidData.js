const express = require('express');
const User = require('../models/user');

const bidsDataController = require('../controllers/bidsData');


const isUserAuth = require('../middleware/is-userAuth');

const { body } = require('express-validator');

const authController = require('../controllers/auth');

const router = express.Router();


router.post('/', isUserAuth, bidsDataController.getBidsData);

module.exports = router
