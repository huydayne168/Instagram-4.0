const { Router } = require("express");
const authRoute = require("./authRoute");
const postRoute = require("./postRoute");
const userRoute = require("./userRoute");
const likeRoute = require("./likeRoute");
const commentRoute = require("./commentRoute");
const messageRoute = require("./messageRoute");

const router = Router();

// auth router:
router.use("/auth", authRoute);

// post router:
router.use("/post", postRoute);

// user route:
router.use("/user", userRoute);

// like router:
router.use("/like", likeRoute);

// comment router:
router.use("/comment", commentRoute);

// message router:
router.use("/message", messageRoute);

module.exports = router;
