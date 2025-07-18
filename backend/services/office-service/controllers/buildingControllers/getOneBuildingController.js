import mongoose from "mongoose"
import { Building } from "../../models/Building.js"

export const getOneBuildingController = async (req, res) => {
    const { id } = req.params;
    try {
        const building = await Building.findById(id)

        if (!building) return res.status(404).json({ error: "Building not found" })

        res.status(200).json({ building })
    } catch (err) {
        res.status(500).json({ error : 'Something went wrong' })
    }
}