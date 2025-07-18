import mongoose from "mongoose"
import { Building } from "../../models/Building.js"

export const getAllBuildingController = async (req, res) => {
    try {
        const building = await Building.find()
        return res.status(200).json({ building })
    } catch (e) {
        res.status(500).json({ error: 'Something went wrong' })
    }
}