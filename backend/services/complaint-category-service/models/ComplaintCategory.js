import mongoose from "mongoose";
import { ComplaintSubCategorySchema } from "./ComplaintSubCategory.js";

const Schema = mongoose.Schema;

const ComplaintCategorySchema = new Schema({
    category: {
        type: String,
        required: true,
        unique: true
    },
    trsTime: Date,
    activeUserId: mongoose.Schema.Types.ObjectId,
    subCategories: [ComplaintSubCategorySchema]
})

export const ComplaintCategory = mongoose.model('ComplaintCategory', ComplaintCategorySchema)