import Location from "../models/Location.js";

export const addLocation = async (req, res) => {
  try {
    const { bus_id, coords, speed, status } = req.body;
    const location = new Location({ bus_id, coords, speed, status });
    await location.save();
    res.status(201).json(location);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getLatestLocation = async (req, res) => {
  try {
    const location = await Location.findOne({ busId: req.params.busId })
      .sort({ timestamp: -1 });
    if (!location) return res.status(404).json({ message: "Location not found" });
    res.json(location);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllLatestLocations = async (req, res) => {
  try {
    const buses = await Location.aggregate([
      {
        $sort: { timestamp: -1 }
      },
      {
        $group: {
          _id: "$bus_id",
          latestLocation: { $first: "$$ROOT" }
        }
      }
    ]);
    res.json(buses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};