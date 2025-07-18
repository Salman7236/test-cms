import mongoose from "mongoose";

const Schema = mongoose.Schema;

const OfficeSchema = new Schema({
    officeNo: {
        type: String,
        required: true
    },
    floorNo: String,
    officeStatus: {
        type: String,
        required: true
    },
    trsTime: Date,
    buildingId: {
        type: mongoose.Schema.Types.ObjectId
        //required: true
    },
    officeTypeId: mongoose.Schema.Types.ObjectId,
    officeCellNo: mongoose.Schema.Types.ObjectId,
    companyId: mongoose.Schema.Types.ObjectId
})

export const Office = mongoose.model('Office', OfficeSchema)