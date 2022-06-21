const express = require('express');

const authController = require('../controllers/auth');

const router = express.Router();

router.get('/signin', authController.getSignin);
router.post('/signin', authController.postSignin);

module.exports = router;