const likeService = require("../services/likeService");

// Create Like:
exports.createLikePost = async (req, res, next) => {
    try {
        const currentUserId = req.currentUser.id;
        const { postId } = req.body;
        const result = await likeService.createLikePost(currentUserId, postId);
        return res.status(result.status).json(result);
    } catch (error) {
        next(error);
    }
};

// Delete Like:
exports.deleteLikePost = async (req, res, next) => {
    try {
        const currentUserId = req.currentUser.id;
        const { postId } = req.body;
        const result = await likeService.deleteLikePost(currentUserId, postId);
        return res.status(result.status).json(result);
    } catch (error) {
        next(error);
    }
};
