const { User } = require("../models");

// create new User:
exports.createUser = (email, full_name, username, password, refreshToken) => {
    return User.create({
        email,
        full_name,
        username,
        password,
        refreshToken,
    });
};

// find An User:
exports.findAnUser = (condition) => {
    return User.findOne({
        where: {
            ...condition,
        },
    });
};

// update an User:
exports.updateAnUser = (update, condition) => {
    return User.update(update, {
        where: condition,
    });
};
