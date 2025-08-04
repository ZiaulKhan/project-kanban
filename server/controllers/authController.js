const User = require("../models/User");
const { generateToken } = require("../utils/helpers");

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.create({ name, email, password });
    const token = generateToken(user);
    res
      .status(201)
      .json({ user: { name: user.name, email: user.email }, token });
  } catch (err) {
    next(err);
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = generateToken(user);
    res
      .status(200)
      .json({ user: { name: user.name, email: user.email }, token });
  } catch (err) {
    next(err);
  }
};
