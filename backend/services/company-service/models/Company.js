import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CompanySchema = new Schema({
    companyName: {
        type: String,
        required: true
    },
    companyStatus: String,
    trsTime: Date,
    companyAbbr: String
})

export const Company = mongoose.model('Company', CompanySchema)