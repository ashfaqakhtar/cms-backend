import mongoose, { Schema } from "mongoose";

const likeSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    blog: {
        type: Schema.Types.ObjectId,
        ref: "Blog",
    },
    comment: {
        type: Schema.Types.ObjectId,
        ref: "Comment",
    },
    ipAddress: {
        type: String,
        required: true
    },
    likesCount: {
        type: Number,
        default: 0
    }

}, { timestamps: true });

const Like = mongoose.model("Like", likeSchema);

export default Like;
