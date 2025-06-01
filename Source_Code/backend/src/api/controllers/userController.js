const userService = require("../services/userService");

// Get All Users:
exports.getAllUsers = async (req, res, next) => {
    try {
        const result = await userService.getAllUsers();
        res.json(result);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// Get Suggested Users:
exports.getSuggestedUsers = async (req, res, next) => {
    try {
        const currentUserId = req.currentUser.id;
        const result = await userService.getSuggestedUsers(currentUserId);
        res.json(result);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// get User Profile:
exports.getUserProfile = async (req, res, next) => {
    try {
        const _id = req.query._id;
        const result = await userService.getUserProfile(_id);
        res.json(result);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// Create Follow:
exports.createFollow = async (req, res, next) => {
    const followingId = req.body.userId;
    const userId = req.currentUser.id;
    try {
        const result = await userService.createFollow(userId, followingId);
        res.json(result);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// Delete Follow:
exports.deleteFollow = async (req, res, next) => {
    const followingId = req.body.userId;
    const userId = req.currentUser.id;
    try {
        const result = await userService.deleteFollow(userId, followingId);
        res.json(result);
    } catch (error) {
        console.log(error);
        next(error);
    }
};
