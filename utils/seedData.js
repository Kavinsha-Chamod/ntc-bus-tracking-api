"use strict";
const { connectDB, models } = require("../config/db");
const mongoose = require("mongoose");

async function seed() {
  await connectDB();
  console.log("Seeding main data...");

  await Promise.all([
    models.Route.deleteMany({}),
    models.Bus.deleteMany({}),
    models.Trip.deleteMany({}),
    models.User.deleteMany({}),
    models.Location.deleteMany({}),
  ]);

  // Users
  await models.User.insertMany([
    { username: "admin", password: "admin@1234", role: "admin" },
    { username: "operator", password: "operator@1234", role: "operator" },
    { username: "commuter", password: "commuter@1234", role: "commuter" },
  ]);

  // 5 Real Routes (from NTC searches )
  const routes = [
    {
      routeId: 1,
      from: "Colombo",
      to: "Kandy",
      distance: 115,
      estimatedTime: "3h 30m",
      frequency: "Every 30min",
    },
    {
      routeId: 2,
      from: "Colombo",
      to: "Galle",
      distance: 120,
      estimatedTime: "2h 45m",
      frequency: "Every 30min",
    },
    {
      routeId: 3,
      from: "Colombo",
      to: "Anuradhapura",
      distance: 210,
      estimatedTime: "5h",
      frequency: "Every 2h",
    },
    {
      routeId: 4,
      from: "Colombo",
      to: "Jaffna",
      distance: 400,
      estimatedTime: "9h",
      frequency: "Every 4h",
    },
    {
      routeId: 5,
      from: "Colombo",
      to: "Badulla",
      distance: 290,
      estimatedTime: "7h",
      frequency: "Every 4h",
    },
  ];
  await models.Route.insertMany(routes);

  // 25 Buses (5/route)
  const buses = [];
  for (let r = 1; r <= 5; r++) {
    for (let i = 1; i <= 5; i++) {
      buses.push({
        busId: (r - 1) * 5 + i,
        routeId: r,
        operatorId: 2,
        capacity: 50,
        licensePlate: `WP/AB/${(r - 1) * 5 + i}123`,
      });
    }
  }
  await models.Bus.insertMany(buses);

  // Simulated locations (around Sri Lanka routes, lat/long approx)
  const locations = [];
  for (let i = 1; i <= 25; i++) {
    locations.push({
      busId: i,
      latitude: 6.9271 + (Math.random() - 0.5) * 0.5, 
      longitude: 79.8612 + (Math.random() - 0.5) * 1, 
    });
  }
  await models.Location.insertMany(locations);

  // Trips: 2/day/bus for a week
  const trips = [];
  const startDate = new Date("2025-10-02T06:00:00.000Z");
  for (let bus of buses) {
    for (let day = 0; day < 7; day++) {
      let dep = new Date(startDate);
      dep.setDate(startDate.getDate() + day);
      const duration =
        routes
          .find((r) => r.routeId === bus.routeId)
          .estimatedTime.match(/(\d+)h/)?.[1] * 3600000 || 10800000; // Default 3h
      trips.push({
        tripId: Date.now() + Math.floor(Math.random() * 10000),
        busId: bus.busId,
        departureTime: dep,
        arrivalTime: new Date(dep.getTime() + duration),
        status: "scheduled",
      });
      dep = new Date(dep.getTime() + 6 * 3600000);
      trips.push({
        tripId: Date.now() + Math.floor(Math.random() * 10000) + 1,
        busId: bus.busId,
        departureTime: dep,
        arrivalTime: new Date(dep.getTime() + duration),
        status: "scheduled",
      });
    }
  }
  await models.Trip.insertMany(trips.slice(0, 500)); 

  console.log(
    "Main data seeded! Export JSON: Use MongoDB Compass or mongoexport."
  );
  mongoose.connection.close();
}

seed().catch(console.error);
