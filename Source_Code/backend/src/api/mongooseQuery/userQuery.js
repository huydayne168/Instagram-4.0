const { User } = require("../models");

// Create an User:
const createUser = (data) => {
    return User.create({
        username: data.username,
        password: data.password,
        email: data.email,
        bio: data.bio || null,
        fullName: data.fullName,
        avatar: data.avatar || null,
        facebookId: data.facebookId || null,
    });
};

// Find an User:
const findAnUser = (data) => {
    return User.findOne({ ...data })
        .populate("followers")
        .populate("followings");
};

//update an User:
const updateAnUser = (condition, updateData) => {
    return User.updateOne(condition, updateData);
};

// Get All Users
const getAllUsers = () => {
    return User.find();
};

// Get Suggested Users
const getSuggestedUsers = async (currentUserId) => {
    const currentUser = await User.findById(currentUserId).select("followings");
    const followingIds = currentUser.followings || [];
    return User.find({
        _id: { $nin: [...followingIds, currentUserId] },
    })
        .populate("followers")
        .populate("followings")
        .limit(10);
};

// Follow:
const createFollow = (userId, followingId) => {
    const user = User.updateOne(
        { _id: followingId },
        { $addToSet: { followers: userId } }
    );
    const followedUser = User.updateOne(
        { _id: userId },
        { $addToSet: { followings: followingId } }
    );
    return Promise.all([user, followedUser]);
};

// Delete Follow:
const deleteFollow = (userId, followingId) => {
    const user = User.updateOne(
        { _id: followingId },
        { $pull: { followers: userId } }
    );
    const followedUser = User.updateOne(
        { _id: userId },
        { $pull: { followings: followingId } }
    );
    return Promise.all([user, followedUser]);
};

// exports:
module.exports = {
    createUser,
    findAnUser,
    updateAnUser,
    getAllUsers,
    getSuggestedUsers,
    createFollow,
    deleteFollow,
};
