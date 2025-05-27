const { required } = require("joi");
const mongoose = require("mongoose");

const { Schema } = mongoose;

const postSchema = new Schema(
    {
        caption: {
            type: String,
            required: false,
        },
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        photoVideo: [
            {
                type: Schema.Types.ObjectId,
                require: true,
                ref: "PhotoVideo",
            },
        ],
        likes: [
            {
                type: Schema.Types.ObjectId,
                ref: "Like",
            },
        ],
        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: "Comment",
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
