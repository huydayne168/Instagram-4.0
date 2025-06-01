const { default: mongoose, Schema } = require("mongoose");

const messageSchema = new Schema(
    {
        sender_id: {
            ref: "User",
            type: Schema.Types.ObjectId,
            required: true,
        },
        receiver_id: {
            ref: "User",
            type: Schema.Types.ObjectId,
            required: true,
        },
        contents: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
