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

exports.getUserProfile = async (req, res, next) => {
    try {
        const username = req.query.username;
        console.log(req.query);
        const result = await userService.getUserProfile(username);
        res.json(result);
    } catch (error) {
        console.log(error);
        next(error);
    }
};
