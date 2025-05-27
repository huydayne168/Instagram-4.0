const { Post } = require("../models");

// Create Post
exports.createPost = (caption, user_id) => {
    return Post.create({
        caption,
        user_id,
    });
};
