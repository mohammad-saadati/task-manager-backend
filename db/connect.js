require("dotenv");
const mongoose = require("mongoose");

const connectDB = async (connectionString) => {
  mongoose.set("strictQuery", false);

  await mongoose.connect(connectionString);

  console.log("DB Connected...");
};


module.exports = {
  connectDB,
};
