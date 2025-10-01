"use strict";
const { models } = require("../config/db");

exports.getAllBuses = async (req, res, next) => {
  try {
    const Bus = models.Bus;
    let query = {};
    if (req.query.routeId) query.routeId = parseInt(req.query.routeId);

    const sort = req.query.sort
      ? {
          [req.query.sort.split(":")[0]]:
            req.query.sort.split(":")[1] === "desc" ? -1 : 1,
        }
      : { busId: 1 };

    const buses = await Bus.find(query).sort(sort);
    res.status(200).json(buses);
  } catch (err) {
    next(err);
  }
};

exports.createBus = async (req, res, next) => {
  try {
    const Bus = models.Bus;
    const newBus = new Bus({ ...req.body, busId: Date.now() });
    await newBus.save();
    res.status(201).json(newBus);
  } catch (err) {
    next(err);
  }
};

exports.getBusById = async (req, res, next) => {
  try {
    const Bus = models.Bus;
    const bus = await Bus.findOne({ busId: parseInt(req.params.id) });
    if (!bus) return res.status(404).json({ error: "Bus not found" });
    res.status(200).json(bus);
  } catch (err) {
    next(err);
  }
};

exports.updateBus = async (req, res, next) => {
  try {
    const Bus = models.Bus;
    const busId = parseInt(req.params.id);
    if (req.user.role !== "admin" && bus.operatorId !== req.user.id) {
      return res.status(403).json({ error: "Insufficient permissions" });
    }
    const bus = await Bus.findOneAndUpdate({ busId }, req.body, { new: true });
    if (!bus) return res.status(404).json({ error: "Bus not found" });
    res.status(200).json(bus);
  } catch (err) {
    next(err);
  }
};

exports.deleteBus = async (req, res, next) => {
  try {
    const Bus = models.Bus;
    const busId = parseInt(req.params.id);
    if (req.user.role !== "admin")
      return res.status(403).json({ error: "Admin only" });
    const bus = await Bus.findOneAndDelete({ busId });
    if (!bus) return res.status(404).json({ error: "Bus not found" });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
