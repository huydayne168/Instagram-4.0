const Comment = require("../models/comment");

// Create Comment:
exports.createComment = (postId, currentUserId, content) => {
    return Comment.create({ postId, userId: currentUserId, content });
};

// Get Comments:
exports.getComments = (postId) => {
    return Comment.find({ postId }).populate("userId").sort({ createdAt: -1 });
};

// Find a Comment:
exports.findAComment = (commentId) => {
    return Comment.findById(commentId).populate("userId");
};
