import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    userName : {
        type: String,
        unique: true,
        required: true
    },
    userPwd: {
        type: String,
        required: true
    },
    userStatus: String,
    userCell: String,
    userExt: String,
    trsTime: {
        type: Date,
        default: () => new Date
    },
    companyId: mongoose.Schema.Types.ObjectId,
    userTypeId: mongoose.Schema.Types.ObjectId,
    createdBy: mongoose.Schema.Types.ObjectId,
    createdDate: {
        type: Date,
        default: () => new Date
    },
    updatedBy: mongoose.Schema.Types.ObjectId,
    updatedDate: {
        type: Date,
        default: () => new Date
    },
    officeAllocId: mongoose.Schema.Types.ObjectId,
    complaintCategoryId: mongoose.Schema.Types.ObjectId
})

export const User = mongoose.model('User', UserSchema)