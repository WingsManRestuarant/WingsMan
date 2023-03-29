const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');

// GET login page
router.get('/login', authController.getLoginPage);

// POST login
router.post('/login', authController.login);

// GET register page
router.get('/register', authController.getRegisterPage);

// POST register
router.post('/register', authController.register);

module.exports = router;