const express = require("express");
const router = express.Router();
// cintroller
const { register, login, logout, currentUser } = require("../controllers/auth");
// middlewares
const authMiddleware = require("../middlewares/auth");

router.route("/register").post(register);
router.route("/login").post(login);
router.get('/logout', logout);
router.route("/currentuser").post(authMiddleware, currentUser);

module.exports = router;
