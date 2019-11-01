const { Schema, model } = require("mongoose");

const MessageSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        message: {
            type: String,
            required: true
        },
        socket: {
            type: String
        }
    },
    {
        timestamps: true
    }
);


module.exports = model("Message", MessageSchema);
