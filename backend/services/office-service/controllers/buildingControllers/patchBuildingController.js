import mongoose from "mongoose"
import { Building } from "../../models/Building.js"

export const patchBuildingController = async (req, res) => {
    const { id } = req.params
    try {
        const building = await Building.findOneAndUpdate(
            { _id: id }, 
            { $set: req.body }, 
            { new: true, runValidators: true }
        )

        if (!building) return res.status(404).json({ error: "Building not found" })

        res.status(200).json({ message: "Data Updated" })
    } catch (err) {
        res.status(500).json({ error: 'Something went wrong' })
    }
}