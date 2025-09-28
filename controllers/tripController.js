import Trip from "../models/Trip.js";

export const getTrips = async (req, res) => {
  try {
    const query = {};
    if (req.query.date) query.date = new Date(req.query.date);
    if (req.query.routeId) query.route_id = req.query.routeId;

    const trips = await Trip.find(query);
    res.json(trips);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getTripById = async (req, res) => {
  try {
    const trip = await Trip.findOne({ tripId: req.params.id });
    if (!trip) return res.status(404).json({ message: "Trip not found" });
    res.json(trip);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateTripStatus = async (req, res) => {
  try {
    const trip = await Trip.findOne({ tripId: req.params.id });
    if (!trip) return res.status(404).json({ message: "Trip not found" });

    const { status, delay_mins } = req.body;
    if (status) trip.status = status;
    if (delay_mins !== undefined) trip.delay_mins = delay_mins;

    await trip.save();
    res.json(trip);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
