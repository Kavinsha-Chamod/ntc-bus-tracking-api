import Route from "../models/BusRoute.js";
import Bus from "../models/Bus.js";

export const getRoutes = async (req, res) => {
  try {
    const routes = await Route.find();
    res.json(routes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getRouteById = async (req, res) => {
  try {
    const route = await Route.findOne({ routeId: req.params.route_id });
    if (!route) return res.status(404).json({ message: "Route not found" });
    res.json(route);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getBusesByRoute = async (req, res) => {
  try {
    const buses = await Bus.find({ assignedRoute: req.params.id});
    res.json(buses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
