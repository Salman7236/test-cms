import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    userId: mongoose.Schema.Types.ObjectId,
    comment: {
        type: String,
        required: true
    },
    complaintId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    commentTime: Date,
    readStatus: String
})

export const Comment = mongoose.model('Comments', CommentSchema)