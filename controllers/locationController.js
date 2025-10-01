"use strict";
const crypto = require("crypto");
const { models } = require("../config/db");

exports.getAllLocations = async (req, res, next) => {
  try {
    const Location = models.Location;
    let query = {};
    if (req.query.busId) query.busId = parseInt(req.query.busId);

    const locations = await Location.aggregate([
      { $match: query },
      { $sort: { timestamp: -1 } },
      { $group: { _id: "$busId", latest: { $first: "$$ROOT" } } },
      { $replaceRoot: { newRoot: "$latest" } },
    ]).limit(25);

    const etag = crypto
      .createHash("md5")
      .update(JSON.stringify(locations))
      .digest("hex");
    const lastModified = new Date().toUTCString();
    res.set({
      ETag: etag,
      "Last-Modified": lastModified,
      "Cache-Control": "no-cache",
    });

    if (
      req.headers["if-none-match"] === etag ||
      req.headers["if-modified-since"] === lastModified
    ) {
      return res.status(304).end();
    }

    res.status(200).json(locations);
  } catch (err) {
    next(err);
  }
};

exports.createLocation = async (req, res, next) => {
  try {
    if (req.user.role !== "operator") {
      return res
        .status(403)
        .json({ error: "Operator only for location updates" });
    }
    const Location = models.Location;
    const { busId, latitude, longitude } = req.body;

    if (
      latitude < -90 ||
      latitude > 90 ||
      longitude < -180 ||
      longitude > 180
    ) {
      return res.status(400).json({ error: "Invalid coordinates" });
    }

    const bus = await models.Bus.findOne({ busId: parseInt(busId) });
    if (!bus || bus.operatorId !== req.user.id) {
      return res.status(403).json({ error: "Not authorized for this bus" });
    }

    await Location.deleteMany({ busId: parseInt(busId) });
    const newLocation = new Location({
      busId: parseInt(busId),
      latitude,
      longitude,
    });
    await newLocation.save();
    res.status(201).json(newLocation);
  } catch (err) {
    next(err);
  }
};

exports.getLocationById = async (req, res, next) => {
  try {
    const Location = models.Location;
    const location = await Location.findOne({
      busId: parseInt(req.params.id),
    }).sort({ timestamp: -1 });
    if (!location) return res.status(404).json({ error: "Location not found" });

    const etag = crypto
      .createHash("md5")
      .update(JSON.stringify(location))
      .digest("hex");
    res.set({ ETag: etag, "Cache-Control": "no-cache" });
    if (req.headers["if-none-match"] === etag) return res.status(304).end();

    res.status(200).json(location);
  } catch (err) {
    next(err);
  }
};

exports.updateLocation = async (req, res, next) => {
  try {
    if (req.user.role !== "operator") {
      return res.status(403).json({ error: "Operator only" });
    }
    const Location = models.Location;
    const busId = parseInt(req.params.id);
    const updated = await Location.findOneAndUpdate(
      { busId },
      { ...req.body, timestamp: new Date() },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: "Location not found" });
    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
};

exports.deleteLocation = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Admin only" });
    }
    const Location = models.Location;
    const deleted = await Location.findOneAndDelete({
      busId: parseInt(req.params.id),
    });
    if (!deleted) return res.status(404).json({ error: "Location not found" });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
