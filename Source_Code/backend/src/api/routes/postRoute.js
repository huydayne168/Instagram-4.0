const express = require("express");
const router = express.Router();
const { createPost, getAllPosts } = require("../controllers/postController");
const { verifyJWT } = require("../middlewares/verifyJWT");
const { validateReqBody } = require("../middlewares/validateReqBody");
const { createPostSchema } = require("../validations/postValidation");

// Create Post:
router.post(
    "/create-post",
    verifyJWT,
    validateReqBody(createPostSchema),
    createPost
);

// Get ALl Posts:
router.get("/get-all-posts", getAllPosts);

module.exports = router;
