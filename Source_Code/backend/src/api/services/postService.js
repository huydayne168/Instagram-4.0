const postQuery = require("../mongooseQuery/postQuery");
const photoVideoQuery = require("../mongooseQuery/photoVideoQuery");
const followingQuery = require("../mongooseQuery/followingQuery");
const photoVideoHelper = require("../helpers/photoVideoHelper");
const { StatusCodes } = require("http-status-codes");

// Create Post:
exports.createPost = async (videoPhotoList, caption, user_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Create a post:
            const newPost = await postQuery.createPost({
                caption,
                userId: user_id,
                photoVideo: [],
            });
            const photoVideoIdList = [];
            // Create videos and photos
            const promises = videoPhotoList.map(async (item, index) => {
                const { url, type, name } = item;
                const cloudinaryUrl =
                    await photoVideoHelper.storePhotoVideoToCloudinary(url);

                // create Photo Video
                const newPhotoVideo = await photoVideoQuery.createPhotoVideo({
                    postId: newPost._id,
                    url: cloudinaryUrl,
                    postIndex: index,
                    type: type,
                });
                photoVideoIdList[index] = newPhotoVideo._id;
            });

            await Promise.all(promises);

            newPost.photoVideo = photoVideoIdList;
            await newPost.save();
            // const newPostDetail = await newPost
            //     .populate("photoVideo")
            //     .populate("userId");

            resolve({
                status: StatusCodes.CREATED,
                message: "success!",
                post: newPost,
            });
        } catch (error) {
            console.log(error);
            reject({
                status: StatusCodes.INTERNAL_SERVER_ERROR,
                message: "something wrong!",
            });
        }
    });
};

// Get All Posts:
exports.getAllPosts = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            const postsList = await postQuery.getAllPosts();
            resolve({
                postsList,
                status: StatusCodes.OK,
                message: "Success to get all Posts!",
            });
        } catch (error) {
            console.log(error);
            reject({
                status: StatusCodes.INTERNAL_SERVER_ERROR,
                message: "Error to get all Posts!",
            });
        }
    });
};

// Get Following Posts
exports.getFollowingPosts = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const followings = await followingQuery.findFollowings(userId);
            const followingsIdList = followings.map((item) => {
                return item.followingId;
            });
            const result = await postQuery.getFollowingPosts(followingsIdList);

            resolve({
                postsList,
                status: StatusCodes.OK,
                message: "Success to get following Posts!",
            });
        } catch (error) {
            console.log(error);
            reject({
                status: StatusCodes.INTERNAL_SERVER_ERROR,
                message: "Error to get following Posts!",
            });
        }
    });
};
