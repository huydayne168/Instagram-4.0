const { PhotoVideo } = require("../models");

const createPhotoVideo = (data) => {
    return PhotoVideo.create({
        postId: data.postId,
        url: data.url,
        postIndex: data.postIndex,
        type: data.type,
    });
};

module.exports = { createPhotoVideo };
