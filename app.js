// third parties
require("express-async-errors");
var cookieParser = require("cookie-parser");

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
// security
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");

app.use(helmet());
app.use(cors());
app.use(xss());
app.set("trust proxy", 1);
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);

app.use(express.static("./public"));

app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
// register routes
const { sendEmail } = require("./controllers/sendEmail");
app.use("/api/v1/testEmail", sendEmail);
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
