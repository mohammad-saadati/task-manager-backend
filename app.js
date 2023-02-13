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
// session
var cookieSession = require("cookie-session");
// passport
const passport = require("passport");
const passportSetup = require("./utils/googleStrategy");

app.use(helmet());
app.use(
  cors({
    origin: "http://127.0.0.1:5173",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
app.use(xss());
app.set("trust proxy", 1);
app.use(
  cookieSession({
    name: "session",
    keys: ["cyberwhole"],
    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 1000,
  })
);
app.use(express.static("./public"));

app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
// register routes
const { sendEmail } = require("./controllers/sendEmail");
app.get("/api/v1/send-email", sendEmail);
app.get("/api/v1/test", (req, res) => {
  res.status(200).json({ name: "test" });
});
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
