import Bus from "../models/Bus.js";

export const getBuses = async (req, res) => {
  try {
    const buses = await Bus.find();
    res.json(buses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getBusById = async (req, res) => {
  try {
    const bus = await Bus.findOne({ bus_id: req.params.bus_id });
    if (!bus) return res.status(404).json({ message: "Bus not found" });
    res.json(bus);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getBusesByRoute = async (req, res) => {
  try {
    const buses = await Bus.find({ primary_route: req.params.routeId });
    res.json(buses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

