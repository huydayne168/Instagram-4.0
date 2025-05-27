const { StatusCodes } = require("http-status-codes");
const commentQuery = require("../mongooseQuery/commentQuery");
const postQuery = require("../mongooseQuery/postQuery");

// Create Comment:
exports.createComment = async (postId, currentUserId, content) => {
    return new Promise(async (resolve, reject) => {
        try {
            // find the post:
            const post = await postQuery.findAPost(postId);
            if (!post) {
                reject({
                    status: StatusCodes.NOT_FOUND,
                    message: "Post not found!",
                });
            } else {
                const comment = await commentQuery.createComment(
                    postId,
                    currentUserId,
                    content
                );

                // add this comment to the post:
                post.comments.push(comment._id);
                await post.save();

                const commentDetail = await commentQuery.findAComment(
                    comment._id
                );
                resolve({
                    comment: commentDetail,
                    status: StatusCodes.CREATED,
                    message: "Comment created!",
                });
            }
        } catch (error) {
            reject({
                status: StatusCodes.INTERNAL_SERVER_ERROR,
                message: "Something wrong, can not comment!",
            });
        }
    });
};

// Get Comments:
exports.getComments = async (postId) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(postId);
            const post = await postQuery.findAPost(postId);
            if (!post) {
                reject({
                    status: StatusCodes.NOT_FOUND,
                    message: "Post not found!",
                });
            } else {
                const comments = await commentQuery.getComments(postId);
                resolve({
                    comments,
                    status: StatusCodes.OK,
                    message: "Comments found!",
                });
            }
        } catch (error) {
            reject({
                status: StatusCodes.INTERNAL_SERVER_ERROR,
                message: "Something wrong, can not get comments!",
            });
        }
    });
};
