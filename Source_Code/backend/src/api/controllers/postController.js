const postService = require("../services/postService");

// create a Post:
exports.createPost = async (req, res, next) => {
    try {
        const { photoVideoList, caption } = req.body;

        const result = await postService.createPost(
            photoVideoList,
            caption,
            req.currentUser.id
        );
        res.json(result);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// Get All Posts:
exports.getAllPosts = async (req, res, next) => {
    try {
        const result = await postService.getAllPosts();
        res.json(result);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// Get All Posts:
exports.getFollowingPosts = async (req, res, next) => {
    try {
        const userId = req.currentUser.id;
        const result = await postService.getFollowingPosts(userId);
        res.json(result);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// Delete a Post:
