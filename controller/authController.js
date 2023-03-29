const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');

const authController = {
  getLoginPage: (req, res) => {
    res.render('login');
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(401).send('Invalid email or password');
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).send('Invalid email or password');
      }

      req.session.user = user;
      res.redirect('/category');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  },

  getRegisterPage: (req, res) => {
    res.render('register');
  },

  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new User({
        name,
        email,
        password: hashedPassword,
      });

      await user.save();

      req.session.user = user;
      res.redirect('/category');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  }
};

module.exports = authController;
