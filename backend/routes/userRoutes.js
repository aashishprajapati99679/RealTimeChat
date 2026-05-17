const express = require("express");
const { register, login, logout, getOtherUsers } = require("../controllers/userControler");
const isAuthentiacated = require("../middleware/isAuthentiacated");

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/").get(isAuthentiacated, getOtherUsers);


module.exports = router;