"use strict";
const jwt = require("jsonwebtoken");
const { models } = require("../config/db");

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const User = models.User;
    const user = await User.findOne({ username, password });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_SECRET_EXPIRES_IN || "10h" }
    );
    res.json({ token, user: { id: user._id, role: user.role } });
  } catch (err) {
    next(err);
  }
};
