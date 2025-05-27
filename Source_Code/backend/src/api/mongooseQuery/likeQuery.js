const Like = require("../models/like");

// Create Like:
exports.createLikePost = (currentUserId, postId) => {
    return Like.create({ userId: currentUserId, postId: postId });
};

// Delete Like:
exports.deleteLikePost = (currentUserId, postId) => {
    return Like.findOneAndDelete({ userId: currentUserId, postId });
};

// Find Like:
exports.findLikePost = (currentUserId, postId) => {
    return Like.findOne({ userId: currentUserId, postId });
};
