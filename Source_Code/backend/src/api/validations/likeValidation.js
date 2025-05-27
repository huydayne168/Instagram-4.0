const Joi = require("joi");

// Like Validation:
exports.likeValidation = Joi.object({
    postId: Joi.string().allow(null),
    commentId: Joi.string().allow(null),
});
