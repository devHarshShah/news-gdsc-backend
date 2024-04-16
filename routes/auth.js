const express = require('express');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
JWT_SECRET = 'HelloIAmHarshShahandIamAStudentAtVITVellore';

router.post('/createuser', [body('username', 'Enter a valid username').isLength({ min: 3 }), body('email', 'Must be a valid email').isEmail(), body('password', 'Must be at least 5 Characters').isLength({ min: 5 })], async (req, res) => {
  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ error: 'Sorry, a user with this email already exists' });
    }
    let salt = await bcrypt.genSalt(10);
    let secPass = await bcrypt.hash(req.body.password, salt);
    user = User.create({
      username: req.body.username,
      email: req.body.email,
      password: secPass,
      creationDate: Date.now()
    });
    const data = {
      id: user.id,
    };
    const authtoken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({ success, authtoken });
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Some Error Occurred');
  }
});

router.post('/login', [body('email', 'Must be a valid email').isEmail(), body('password', 'Cannot be Blank').exists()], async (req, res) => {
  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Please try to login with the correct credentials' });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(400).json({ error: 'Please try to login with the correct credentials' });
    }

    const data = {
      id: user.id,
    };
    const authtoken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({ success, authtoken });
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Some Error Occurred');
  }
});

router.post('/getuser', fetchuser, async (req, res) => {
  try {
    let userid = await req.user.id;
    const user = await User.findById(userid).select('-password');
    res.send(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Some Error Occurred');
  }
});

module.exports = router;