const express = require("express");
const app = express();
// routes
const tasks = require("./routes/tasks");
const auth = require("./routes/auth");
// env
require("dotenv").config();
// db
const { connectDB } = require("./db/connect");
// middleware
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");

app.use(express.static("./public"));

app.use(express.json());
// register routes
app.use("/api/v1", tasks);
app.use("/api/v1", auth);
// register middlewares
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 4000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {});
  } catch (error) {
    console.log(error);
  }
};

start();
