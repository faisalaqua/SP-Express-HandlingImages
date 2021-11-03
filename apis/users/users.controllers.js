const User = require("../../db/models/User");
const bcrypt = require("bcrypt");
const { JWT_SECRET, JWT_EXPIRATION_MS } = require("../../config/keys");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;

    const user = await User.create(req.body);

    const payload = {
      _id: user._id,
      username: user.username,
      exp: Date.now() + JWT_EXPIRATION_MS,
    };

    const token = jwt.sign(payload, JWT_SECRET);
    return res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};
