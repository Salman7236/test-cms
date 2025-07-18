import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const ActionLogSchema = new Schema({
    action: {
        type: String,
        required: true
    },
    actionDate: {
        type: Date,
        default: () => new Date
    },
    remarks: String,
    trsTime: {
        type: Date,
        default: () => new Date
    },
    complaintId: mongoose.Schema.Types.ObjectId,
    createdBy: mongoose.Schema.Types.ObjectId
})

//export const ActionLog = mongoose.model('ActionLog', ActionLogSchema)