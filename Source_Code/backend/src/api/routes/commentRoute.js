const { Router } = require("express");
const {
    createComment,
    getComments,
} = require("../controllers/commentController");
const { verifyJWT } = require("../middlewares/verifyJWT");
const { validateReqBody } = require("../middlewares/validateReqBody");
const { createCommentValidation } = require("../validations/commentValidation");

const router = Router();

// Create Comment:
router.post(
    "/create-comment",
    verifyJWT,
    validateReqBody(createCommentValidation),
    createComment
);

// Get Comments:
router.get("/get-comments", getComments);

module.exports = router;
