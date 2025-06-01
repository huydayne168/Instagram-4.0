const express = require("express");
const router = express.Router();
// const userController = require("../controllers/userController");
const messageController = require("../controllers/messageController");
const { verifyJWT } = require("../middlewares/verifyJWT");

// Get Messages route:
router.get("", verifyJWT, messageController.getMessages);

module.exports = router;
