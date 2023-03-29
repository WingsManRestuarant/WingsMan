const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');

// Login route
router.get('/login', (req, res) => {
  res.render('login');
});

router.post(
  '/login',
  authController.login
);

// Register route
router.get('/register', (req, res) => {
    res.render('register');
  });
  
  router.post(
    '/register',authController.validate('register'),
    authController.register
  );
  
  module.exports = router;
