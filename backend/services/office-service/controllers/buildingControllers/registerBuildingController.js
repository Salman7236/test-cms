import mongoose from "mongoose"
import { Building } from "../../models/Building.js"

export const registerBuildingController = async (req, res) => {
    try {
        const building = new Building(req.body)
        await building.save()
        return res.status(201).json({ message: `Building ${building.building} saved` })
    } catch (err) {
        if (err.code === 11000 && err.keyPattern?.building) {
            return res.status(409).json({ error: "Building already registered" })
        }
        res.status(500).json({ error: 'Something went wrong' })
    }
}