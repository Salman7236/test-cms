import mongoose from "mongoose";

const Schema = mongoose.Schema;

const OfficeAllocationSchema = new Schema({
    officeId: mongoose.Schema.Types.ObjectId,
    deptId: mongoose.Schema.Types.ObjectId,
    fromDate: Date,
    toDate: Date,
    trsTime: Date,
    created: Date,
    createdBy: mongoose.Schema.Types.ObjectId,
    updated: Date,
    updatedBy: mongoose.Schema.Types.ObjectId,
})

export const OfficeAllocation = mongoose.model('OfficeAllocation', OfficeAllocationSchema)