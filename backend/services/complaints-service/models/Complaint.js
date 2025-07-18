import mongoose from "mongoose";
import { ComplaintLogSchema } from "./ComplaintLog.js";
import { ActionLogSchema } from "./ActionLog.js"

const Schema = mongoose.Schema;

const ComplaintSchema = new Schema({
    complaintNo: {
        type: String,
        required: true
    },
    complaintBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        immutable: true
    },
    complaintDate: {
        type: Date,
        default: () => new Date
    },
    complaintDesc: String,
    complaintLevel: Number,
    userCellNo: String,
    complaintStatus: {
        type: String,
        required: true
    },
    trsTime: Date,
    complaintTypeId: {
        type: mongoose.Schema.Types.ObjectId
        //required: true
    },
    extNo: Number,
    resolutionHours: Number,
    officeAllocNo: Number,
    dueTimeCrossed: Number,
    complaintLogs: [ComplaintLogSchema],
    actionLogs: [ActionLogSchema],
})

export const Complaint = mongoose.model('Complaint', ComplaintSchema)