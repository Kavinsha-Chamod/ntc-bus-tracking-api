"use strict";
const crypto = require("crypto");
const { models } = require("../config/db");

const generateETag = (data) =>
  crypto.createHash("md5").update(JSON.stringify(data)).digest("hex");
const getLastModified = () => new Date().toUTCString();

exports.getAllRoutes = async (req, res, next) => {
  try {
    const Route = models.Route;
    let query = {};
    if (req.query.from) query.from = req.query.from;
    if (req.query.to) query.to = req.query.to;

    const sort = req.query.sort
      ? {
          [req.query.sort.split(":")[0]]:
            req.query.sort.split(":")[1] === "desc" ? -1 : 1,
        }
      : { from: 1 };

    const routes = await Route.find(query).sort(sort);
    const etag = generateETag(routes);
    res.set({
      ETag: etag,
      "Last-Modified": getLastModified(),
      "Cache-Control": "public, max-age=300",
    });

    if (
      req.headers["if-none-match"] === etag ||
      req.headers["if-modified-since"] === getLastModified()
    ) {
      return res.status(304).end();
    }

    res.status(200).json(routes);
  } catch (err) {
    next(err);
  }
};

exports.createRoute = async (req, res, next) => {
  try {
    const Route = models.Route;
    const newRoute = new Route({ ...req.body, routeId: Date.now() });
    await newRoute.validate();
    await newRoute.save();
    res.status(201).json(newRoute);
  } catch (err) {
    next(err);
  }
};

exports.getRouteById = async (req, res, next) => {
  try {
    const Route = models.Route;
    const route = await Route.findOne({ routeId: parseInt(req.params.id) });
    if (!route) return res.status(404).json({ error: "Route not found" });

    const etag = generateETag(route);
    res.set({ ETag: etag, "Last-Modified": getLastModified() });
    if (req.headers["if-none-match"] === etag) return res.status(304).end();

    res.status(200).json(route);
  } catch (err) {
    next(err);
  }
};

exports.updateRoute = async (req, res, next) => {
  try {
    const Route = models.Route;
    const route = await Route.findOneAndUpdate(
      { routeId: parseInt(req.params.id) },
      req.body,
      { new: true, runValidators: true }
    );
    if (!route) return res.status(404).json({ error: "Route not found" });
    res.status(200).json(route);
  } catch (err) {
    next(err);
  }
};

exports.deleteRoute = async (req, res, next) => {
  try {
    const Route = models.Route;
    const route = await Route.findOneAndDelete({
      routeId: parseInt(req.params.id),
    });
    if (!route) return res.status(404).json({ error: "Route not found" });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
