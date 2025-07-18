import mongoose from "mongoose";

const Schema = mongoose.Schema;

const BuildingSchema = new Schema ({
    building: {
        type: String,
        required: true,
        unique: true
    },
    buildingAdd: String,
    trsTime: Date
})

export const Building = mongoose.model('Building', BuildingSchema);