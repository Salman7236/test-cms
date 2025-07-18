import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const ComplaintLogSchema = new Schema({
    logDate: {
        type: Date,
        required: true
    },
    markBy: mongoose.Schema.Types.ObjectId,
    markTo: mongoose.Schema.Types.ObjectId,
    orderBy: Number,
    trsTime: {
        type: Date,
        default: () => new Date
    },
    readStatus: {
        type: Boolean,
        default: false
    },
    markByLevel: {
        type: Number,
        default: 1
    },
    markToLevel: {
        type: Number,
        default: 2
    },
    remarks: String,
    markAction: {
        type: String,
        default: 'Mark'
    }
})

//export const ComplaintLog = mongoose.model('ComplaintLog', ComplaintLogSchema)