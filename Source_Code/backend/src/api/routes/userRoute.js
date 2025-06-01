const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { verifyJWT } = require("../middlewares/verifyJWT");

// Get all Users route:
router.get("/get-all-users", userController.getAllUsers);

// Get Suggested Users route:
router.get("/get-suggested-users", verifyJWT, userController.getSuggestedUsers);

// Get User Profile route:
router.get("/get-profile", verifyJWT, userController.getUserProfile);

// Create Follow route:
router.post("/create-follow", verifyJWT, userController.createFollow);

// Delete Follow route:
router.post("/delete-follow", verifyJWT, userController.deleteFollow);

module.exports = router;
