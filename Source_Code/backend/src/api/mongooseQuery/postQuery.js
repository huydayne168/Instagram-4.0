const { Post } = require("../models");

// Create a Post:
const createPost = (data) => {
    return Post.create({
        caption: data.caption,
        userId: data.userId,
        photoVideo: data.photoVideo,
    });
};

// Get All Posts
const getAllPosts = () => {
    return Post.find()
        .populate("userId")
        .populate("photoVideo")
        .populate("likes")
        .sort({ createdAt: -1 });
};

// Get Following Posts:
const getFollowingPosts = (userIdList) => {
    return Post.find({ userId: { $in: userIdList } });
};

// Get User Posts
const getUserPosts = (userId) => {
    return Post.find({ userId }).populate("photoVideo");
};

// Find a Post:
const findAPost = (postId) => {
    return Post.findById(postId);
};

// Update a Post:
const updatePost = (postId, data) => {
    return Post.findByIdAndUpdate(postId, data, { new: true });
};

// Delete Like from Post:
const deleteLikeFromPost = async (post, likeId) => {
    try {
        console.log(post, likeId);
        const index = post.likes.indexOf(likeId);
        if (index > -1) {
            post.likes.splice(index, 1);
        }
        await post.save();
    } catch (error) {
        console.log(error);
        throw {
            message: "Error to delete like from post!",
        };
    }
};

// exports:
module.exports = {
    createPost,
    getAllPosts,
    getFollowingPosts,
    findAPost,
    updatePost,
    deleteLikeFromPost,
    getUserPosts,
};
