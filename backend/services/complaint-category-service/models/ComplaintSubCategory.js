import mongoose from "mongoose";
import { ComplaintTypeSchema } from "./ComplaintType.js";

const Schema = mongoose.Schema;

export const ComplaintSubCategorySchema = new Schema({
    complaintSubCategory: {
        type: String,
        required: true
    },
    status: String,
    complaintTypes: [ComplaintTypeSchema],
    trsTime: Date,
    created: Date,
    createdBy: mongoose.Schema.Types.ObjectId,
    updated: Date,
    updatedBy: mongoose.Schema.Types.ObjectId
})

//export const ComplaintSubCategory = ('ComplaintSubCategory', ComplaintSubCategorySchema);