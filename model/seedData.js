const seedModel = require("./seedModel");
require("dotenv").config();
const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Mongo connected"));

const seedData = [
  {
    trackingNo: 10000000,
    description: "Grocery",
    origin: "Kuala Lumpur",
    destination: "Subang",
    currentLocation: "Kuala Lumpur",
    status: "inProgress",
    weight: 6,
    unit: 1,
  },
  {
    trackingNo: 10000001,
    description: "Milk",
    origin: "Melaka",
    destination: "Perlis",
    currentLocation: "Sabah",
    status: "inProgress",
    weight: 3,
    unit: 2,
  },
  {
    trackingNo: 10000002,
    description: "Milk",
    origin: "Melaka",
    destination: "Perlis",
    currentLocation: "Kelantan",
    status: "inProgress",
    weight: 4,
    unit: 3,
  },
  {
    trackingNo: 10000003,
    description: "Almond",
    origin: "Melaka",
    destination: "Perlis",
    currentLocation: "Pahang",
    status: "created",
    weight: 6,
    unit: 10,
  },
  {
    trackingNo: 10000004,
    description: "Almond",
    origin: "Melaka",
    destination: "Perlis",
    currentLocation: "Perlis",
    status: "delivered",
    weight: 7,
    unit: 1,
  },
  {
    trackingNo: 10000005,
    description: "Almond",
    origin: "Melaka",
    destination: "Perlis",
    currentLocation: "Malacca",
    status: "inProgress",
    weight: 6,
    unit: 1,
  },
  {
    trackingNo: 10000006,
    description: "Almond",
    origin: "Melaka",
    destination: "Perlis",
    currentLocation: "Sarawak",
    status: "inProgress",
    weight: 6,
    unit: 1,
  },
];
function Seed() {
  seedModel.deleteMany().then(() => {
    seedModel
      .insertMany(seedData)
      .then(() => {
        console.log("Data inserted");
        process.exit(0);
      })
      .catch((err) => {
        console.log(err);
        process.exit(1);
      });
  });
}
Seed();
module.exports = seedData;
