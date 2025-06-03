const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationCotroller");
const { verifyJWT } = require("../middlewares/verifyJWT");

// Get all Users route:
router.get(
    "/get-all",
    verifyJWT,
    notificationController.getNotificationsByUserId
);

module.exports = router;
