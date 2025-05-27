const { default: mongoose, Schema } = require("mongoose");

const photoVideoSchema = new Schema(
    {
        postId: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
        postIndex: {
            type: Number,
            required: true,
        },
        type: {
            type: String,
            enum: ["VIDEO", "PHOTO"],
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const PhotoVideo = mongoose.model("PhotoVideo", photoVideoSchema);

module.exports = PhotoVideo;
