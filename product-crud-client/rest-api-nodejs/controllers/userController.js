const User = require('../models/User');

exports.register = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username, password } });
    if (user) res.json({ message: 'Login successful' });
    else res.status(401).json({ message: 'Invalid credentials' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
