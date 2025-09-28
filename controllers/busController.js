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

export const updateBusLocation = async (req, res) => {
  try {
    const { latitude, longitude } = req.body || {};
    if (latitude === undefined || longitude === undefined) {
      return res.status(400).json({ message: "Latitude and longitude are required" });
    }

    const bus = await Bus.findOneAndUpdate(
      { bus_id: req.params.bus_id },
      {
        location: { latitude, longitude, updatedAt: new Date() }
      },
      { new: true }
    );

    if (!bus) return res.status(404).json({ message: "Bus not found" });
    res.json(bus);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getBusLocation = async (req, res) => {
  try {
    const bus = await Bus.findOne({ bus_id: req.params.bus_id });
    if (!bus) return res.status(404).json({ message: "Bus not found" });

    if (!bus.location || !bus.location.latitude || !bus.location.longitude) {
      return res.status(404).json({ message: "Location not available" });
    }

    res.json({
      bus_id: bus.bus_id,
      latitude: bus.location.latitude,
      longitude: bus.location.longitude,
      updatedAt: bus.location.updatedAt
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
