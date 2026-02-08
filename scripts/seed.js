const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("../models/Product");
const products = require("./products.json");

dotenv.config();

const run = async () => {
  if (!process.env.MONGO_URI || process.env.MONGO_URI === "your_mongodb_url") {
    throw new Error("Set a real MONGO_URI in .env before seeding.");
  }

  await mongoose.connect(process.env.MONGO_URI);
  await Product.deleteMany({});
  await Product.insertMany(products);
  await mongoose.disconnect();
  console.log(`Seeded ${products.length} products.`);
};

run().catch(err => {
  console.error(err);
  process.exit(1);
});
