const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const db = require('../utils/db')
const User = require('../models/User');

const authController = {
  login: async (req, res) => {
    try {
      const email = req.body.email;
      const password = req.body.password;
      const user = await User.findOne({ email });

      if (!user) {
        return res.send("<script>alert('Invalid account information! To gain access to the application, Please signup first.'); location.href='login'</script>");
      }

      const match = await bcrypt.compare(password, user.password);

      if (match) {
        req.session.user = email;
        return res.redirect('category');
      } else {
        return res.send("<script>alert('The Email or password you entered is incorrect! Please try again.'); location.href='login';</script>");
      }
    } catch (error) {
      return res.send("<script>alert('Error! Please try again later.');</script>");
    }
  },

  register: async (req, res) => {
    const { name, email, password } = req.body;

    try {
      // Check if the user already exists
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.send("<script>alert('An account with this email already exists! Please try again.'); location.href='register';</script>");
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const user = new User({
        name,
        email,
        password: hashedPassword,
      });

      // Save the user to the database
      await user.save();

      req.session.user = email;

      return res.redirect('category');
    } catch (error) {
      return res.send("<script>alert('Error! Please try again later.');</script>");
    }
  },

  validate: (method) => {
    switch (method) {
      case 'register': {
        return [
          body('name', 'Name is required').notEmpty(),
          body('email', 'Email is required').notEmpty(),
          body('email', 'Email is not valid').isEmail(),
          body('password', 'Password is required').notEmpty(),
          body('password', 'Password should be at least 8 characters').isLength({ min: 8 }),
        ];
      }
    }
  },
};

module.exports = authController;
