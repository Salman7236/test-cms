import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const ComplaintTypeSchema = new Schema({
    complaintType: {
        type: String,
        required: true
    },
    trsTime: Date,
    timeToComplete: Number,
    created: Date,
    createdBy: mongoose.Schema.Types.ObjectId,
    updated: Date,
    updatedBy: mongoose.Schema.Types.ObjectId
})

//export const ComplaintType = ('ComplaintType', ComplaintTypeSchema);