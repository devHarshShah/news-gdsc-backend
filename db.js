const mongoose = require("mongoose");
mongoURL = "mongodb+srv://admin:2090103254.chits.mun@cluster0.38febzf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/news";

connectToMongo = async () => {
  await mongoose.connect(mongoURL);
  console.log("Connected Successfully to MongoDB")
};

module.exports = connectToMongo;