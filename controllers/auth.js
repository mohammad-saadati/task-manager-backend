const crypto = require("node:crypto");
// thidrd parties
const { StatusCodes } = require("http-status-codes");
var jwt = require("jsonwebtoken");
// model
const User = require("../models/User");
// errors
const {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} = require("../errors");
// utils
const { createTokenUser, attachCookiesToResponse } = require("../utils");

const register = async (req, res) => {
  const { username, email, password } = req.body;

  const matchedUser = await User.findOne({ email, username });

  if (matchedUser) throw new BadRequestError("Email/username already exists");

  // const isFirstUser = (await User.countDocuments({})) === 0;
  // const role = isFirstUser ? "admin" : "user";
  const verificationToken = crypto.randomBytes(40).toString("hex");

  const user = await User.create({
    username,
    email,
    password,
    verificationToken,
  });

  const tokenUser = createTokenUser(user);
  // await sendVerificationEmail({
  //   name: user.username,
  //   email: user.email,
  //   verificationToken: user.verificationToken,
  //   origin,
  // });

  attachCookiesToResponse({ res, user: tokenUser });

  res.status(StatusCodes.CREATED).json({
    msg: "Success! Please check your email to verify account",
    temp: user,
  });
};
const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) throw new NotFoundError("User does not exists");

  const isPasswordCorrect = user.comparePassword(password);
  if (!isPasswordCorrect)
    throw new UnauthenticatedError("Invalid Credentials (password)");

  if (!user.isVerified)
    throw new UnauthenticatedError("Please verify your email");

  // const token = user.createJWT();
  const tokenUser = createTokenUser(user);

  attachCookiesToResponse({ res, user: tokenUser });

  res.status(StatusCodes.OK).json({ user: tokenUser });
};
// const logout = async (req, res) => {
//   res.cookie("token", "logout", {
//     httpOnly: true,
//     expires: new Date(Date.now() + 1000),
//   });
//   res.status(StatusCodes.OK).json({ msg: "user logged out!" });
// };
const currentUser = async (req, res, next) => {
  const user = req.user;
  res.json({ msg: "", user });
};
const loginFailed = (req, res) => {
  res
    .status(StatusCodes.UNAUTHORIZED)
    .json({ msg: "Login failure", error: true });
};
const loginSuccess = (req, res) => {
  if (req.user) {
    res
      .status(StatusCodes.OK)
      .json({ error: false, msg: "Login success", user: req.user });
  } else {
    res
      .status(StatusCodes.FORBIDDEN)
      .json({ error: true, msg: "Not Authorized", data: {} });
  }
};
const logout = (req, res) => {
  req.logout();
  res.redirect(process.env.CLIENT_URL);
};

module.exports = {
  register,
  login,
  logout,
  currentUser,
  loginFailed,
  loginSuccess,
};
