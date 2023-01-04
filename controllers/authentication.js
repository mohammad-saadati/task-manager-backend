const asyncWrapper = require("../middlewares/async");
const { createCustomError } = require("../utils/errors");
const { BadRequestError } = require("../utils");
var jwt = require("jsonwebtoken");

const login = asyncWrapper(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    next(new BadRequestError("Please provide username/email and password"));
    return;
  }

  const id = new Date().getDate();

  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.status(200).json({ msg: "", token });
});
const currentUser = asyncWrapper(async (req, res, next) => {
  const user = req.user;
  res.json({ msg: "", user });
});

module.exports = {
  login,
  currentUser,
};
