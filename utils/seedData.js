import dotenv from "dotenv";
import fs from "fs";
import connectDB from "../config/db.js";
import Route from "../models/BusRoute.js";
import Bus from "../models/Bus.js";
import Trip from "../models/Trip.js";

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();
    await Route.deleteMany({});
    await Bus.deleteMany({});
    await Trip.deleteMany({});
    console.log("Existing data cleared");

    const data = JSON.parse(fs.readFileSync("./data/ntc_data.json", "utf-8"));

    await Route.insertMany(data.routes);
    console.log("Routes seeded");

    await Bus.insertMany(data.buses);
    console.log("Buses seeded");

    const tripsWithDate = [];

    for (const date in data.schedule) {
      data.schedule[date].forEach((routeTrips) => {
        routeTrips.trips.forEach((trip) => {
          const statusString = trip.status;
          let status = "On-time";
          let delay_mins = 0;

          if (statusString.startsWith("Delayed")) {
            status = "Delayed";
            const match = statusString.match(/\d+/);
            if (match) delay_mins = parseInt(match[0], 10);
          } else if (statusString === "Cancelled") {
            status = "Cancelled";
          }
          const uniqueTripId = `${trip.trip_id}-${date.replace(/-/g, "")}`;

          tripsWithDate.push({
            ...trip,
            trip_id: uniqueTripId,
            route_id: routeTrips.route_id,
            date: new Date(date),
            status,
            delay_mins,
          });
        });
      });
    }

    await Trip.insertMany(tripsWithDate, { ordered: false });
    console.log("Trips seeded");

    process.exit();
  } catch (error) {
    console.error("Seeder Error:", error);
    process.exit(1);
  }
};

seedData();
