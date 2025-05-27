const { default: mongoose, Schema } = require("mongoose");

const followingSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        require: true,
    },

    followingId: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: "User",
    },
});

const Following = mongoose.model("Following", followingSchema);

module.exports = Following;
