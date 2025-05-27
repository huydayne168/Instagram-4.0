const express = require("express");
const {
    createLikePost,
    deleteLikePost,
} = require("../controllers/likeController");
const { verifyJWT } = require("../middlewares/verifyJWT");
const { validateReqBody } = require("../middlewares/validateReqBody");
const { likeValidation } = require("../validations/likeValidation");

const router = express.Router();

// Create Like:
router.post(
    "/create-like-post",
    verifyJWT,
    validateReqBody(likeValidation),
    createLikePost
);

// Delete Like:
router.delete(
    "/delete-like-post",
    verifyJWT,
    validateReqBody(likeValidation),
    deleteLikePost
);

module.exports = router;
