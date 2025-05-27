const Joi = require("joi");

//Create Comment Validation:
exports.createCommentValidation = Joi.object({
    postId: Joi.string().required(),
    content: Joi.string().required(),
});
