const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }
    // Check if user already exists (by email)
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({ email, password: hashed });

    res.status(201).json({ message: 'User registered successfully', email: user.email });
  } catch (err) {
    // If duplicate email error
    if (err.code === 11000) {
      return res.status(409).json({ message: 'Email already exists.' });
    }
    next(err);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET);
  res.cookie('token', token, { httpOnly: true, secure: false, sameSite: 'lax' });
  res.json({ message: 'Logged in' });
};

exports.logout = (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out' });
};

exports.getCurrentUser = (req, res) => {
  res.json({ user: req.user });
};
