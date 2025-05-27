const Joi = require("joi");

// Create Post Validation:
exports.createPostSchema = Joi.object({
    photoVideoList: Joi.array().items(
        Joi.object({
            url: Joi.string().required(),
            type: Joi.string().valid("VIDEO", "PHOTO").required(),
            name: Joi.string(),
        })
    ),
    caption: Joi.string(),
});
