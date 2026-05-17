const express = require("express");
const router = express.Router();

const { sendMessage, getMessages } = require("../controllers/messagecontroler");
const isAuthentiacated = require("../middleware/isAuthentiacated");

router.route("/send/:id").post(isAuthentiacated, sendMessage);
router.route("/:id").get(isAuthentiacated, getMessages);

module.exports = router;