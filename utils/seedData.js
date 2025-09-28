import dotenv from "dotenv";
import mongoose from "mongoose";
import fs from "fs";

import connectDB from "../config/db.js";
import Route from "../models/BusRoute.js";
import Bus from "../models/Bus.js";
import Trip from "../models/Trip.js";

dotenv.config();

connectDB();

const seedData = async () => {
  try {
    await Route.deleteMany({});
    await Bus.deleteMany({});
    await Trip.deleteMany({});

    const data = JSON.parse(fs.readFileSync("./data/ntc_data.json", "utf-8"));

    await Route.insertMany(data.routes);
    console.log("Routes seeded");

    await Bus.insertMany(data.buses);
    console.log("Buses seeded");

    await Trip.insertMany(data.trips);
    console.log("Trips seeded");

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedData();
