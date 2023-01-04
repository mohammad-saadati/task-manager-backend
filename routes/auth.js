const express = require("express");
const router = express.Router();
// cintroller
const { login, currentUser } = require("../controllers/authentication");
// middlewares
const authMiddleware = require("../middlewares/auth")

router.route("/login").post(login);
router.route("/currentuser").post(authMiddleware, currentUser);

module.exports = router;
