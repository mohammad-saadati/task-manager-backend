const express = require("express");
const router = express.Router();
const passport = require("passport");
// cintroller
const {
  register,
  login,
  logout,
  currentUser,
  loginSuccess,
  loginFailed,
} = require("../controllers/auth");
// middlewares
const authMiddleware = require("../middlewares/auth");

router.route("/register").post(register);
router.route("/login").post(login);
router.get("/logout", logout);
router.route("/currentuser").post(authMiddleware, currentUser);
router.route("/sendEmail").post(authMiddleware, currentUser);
router
  .route("/auth/google")
  .get(passport.authenticate("google", ["profile", "email"]));
router.route("/auth/google/callback").get(
  passport.authenticate("google", {
    successRedirect: "http://localhost:5173",
    faiureRedirect: "/auth/login/failed",
  })
);
router.route("/auth/login/success").get(loginSuccess);
router.route("/auth/login/failed").get(loginFailed);
router.route("/auth/logout").get(logout);

module.exports = router;
