const mongoose = require("mongoose");
require('dotenv').config();
const mongoURL = process.env.MONGO_URL;
connectToMongo = async () => {
  await mongoose.connect(mongoURL);
  console.log("Connected Successfully to MongoDB")
};

module.exports = connectToMongo;