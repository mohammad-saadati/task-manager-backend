require("dotenv");
const mongoose = require("mongoose");

const connectDB = async (connectionString) => {
  mongoose.set("strictQuery", false);

  await mongoose.connect(connectionString);
  // await mongoose.connect(connectionString, {
  //   authSource: "admin",
  //   user: "admin",
  //   pass: "password",
  // });

  console.log("DB Connected...");
};

module.exports = {
  connectDB,
};
