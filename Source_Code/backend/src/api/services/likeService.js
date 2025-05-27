const { StatusCodes } = require("http-status-codes");
const likeQuery = require("../mongooseQuery/likeQuery");
const postQuery = require("../mongooseQuery/postQuery");
const postService = require("./postService");

// Create Like:
exports.createLikePost = (currentUserId, postId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const post = await postQuery.findAPost(postId);
            const isLiked = await likeQuery.findLikePost(currentUserId, postId);
            if (!post) {
                reject({
                    status: StatusCodes.NOT_FOUND,
                    message: "post not found!",
                });
            } else if (isLiked) {
                reject({
                    status: StatusCodes.BAD_REQUEST,
                    message: "you've already liked this post!",
                });
            } else {
                const like = await likeQuery.createLikePost(
                    currentUserId,
                    postId
                );
                post.likes.push(like._id);
                await post.save();
                resolve({
                    like,
                    status: StatusCodes.CREATED,
                    message: "like created!",
                });
            }
        } catch (error) {
            reject({
                status: StatusCodes.INTERNAL_SERVER_ERROR,
                message: "something wrong, can not like!",
            });
        }
    });
};

// Delete Like:
exports.deleteLikePost = (currentUserId, postId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const post = await postQuery.findAPost(postId);
            const like = await likeQuery.deleteLikePost(currentUserId, postId);
            if (!post) {
                reject({
                    status: StatusCodes.NOT_FOUND,
                    message: "post not found!",
                });
            }
            if (!like) {
                reject({
                    status: StatusCodes.NOT_FOUND,
                    message: "like not found!",
                });
            }
            console.log(like._id);
            await postQuery.deleteLikeFromPost(post, like._id);
            resolve({
                status: StatusCodes.OK,
                message: "like deleted!",
            });
        } catch (error) {
            console.log(error);
            reject({
                status: StatusCodes.INTERNAL_SERVER_ERROR,
                message: "something wrong, can not delete like!",
            });
        }
    });
};
