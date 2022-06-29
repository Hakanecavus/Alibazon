const express = require('express');

const authController = require('../controllers/auth');

const router = express.Router();

router.get('/', authController.getRegister);
router.post('/', authController.postRegister);

module.exports = router;