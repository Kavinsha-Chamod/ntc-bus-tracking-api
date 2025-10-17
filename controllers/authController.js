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

// Admin-only registration for creating operator or commuter users
exports.register = async (req, res, next) => {
  try {
    const { username, password, role } = req.body;
    const allowedRoles = ["operator", "commuter"];
    if (!allowedRoles.includes(role)) {
      return res.status(400).json({ error: "Role must be operator or commuter" });
    }
    if (!username || !password) {
      return res.status(400).json({ error: "username and password are required" });
    }

    const User = models.User;
    const existing = await User.findOne({ username });
    if (existing) {
      return res.status(409).json({ error: "Username already exists" });
    }

    const newUser = new User({ username, password, role });
    await newUser.save();

    // Do not return password; no token issued on admin-created accounts
    res.status(201).json({ id: newUser._id, username: newUser.username, role: newUser.role });
  } catch (err) {
    next(err);
  }
};
