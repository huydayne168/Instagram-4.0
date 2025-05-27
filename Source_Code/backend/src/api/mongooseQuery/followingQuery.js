const { Following } = require("../models");

// Find Followings:
exports.findFollowings = (userId) => {
    return Following.find({ userId }).populate("followingId");
};
