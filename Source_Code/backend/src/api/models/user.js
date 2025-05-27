const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema(
    {
        username: {
            type: String,
            require: () => {
                return !this.facebookId;
            },
        },
        password: {
            type: String,
            require: () => {
                return !this.facebookId;
            },
        },
        email: {
            type: String,
            require: true,
        },
        bio: {
            type: String,
        },
        fullName: {
            type: String,
            require: true,
        },
        avatar: {
            type: String,
        },
        followers: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
                require: false,
            },
        ],
        followings: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
                require: false,
            },
        ],
        refreshToken: String,
        facebookId: String,
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
