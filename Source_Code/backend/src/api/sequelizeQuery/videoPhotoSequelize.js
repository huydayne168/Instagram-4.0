const { VideoPhoto } = require("../models");

exports.createVideoPhoto = (url, type, post_id, post_index) => {
    return VideoPhoto.create({
        url,
        type,
        post_id,
        post_index,
    });
};
