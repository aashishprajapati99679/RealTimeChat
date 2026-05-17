const express = require("express");
const { register, login, logout, getOtherUsers, updateProfile } = require("../controllers/userControler");
const isAuthentiacated = require("../middleware/isAuthentiacated");
const multer = require("multer");
const path = require("path");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/").get(isAuthentiacated, getOtherUsers);
router.route("/update").put(isAuthentiacated, upload.single("profilePhoto"), updateProfile);

module.exports = router;