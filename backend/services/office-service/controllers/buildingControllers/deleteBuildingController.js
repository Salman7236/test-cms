import mongoose from "mongoose"
import { Building } from '../../models/Building.js'

export const deleteBuildingController = async (req, res) => {
    const { id } = req.params;
    try {
        const building = await Building.findByIdAndDelete(id)

        if (!building) return res.status(404).json({ error: "Building not found" })

        return res.status(200).json({ message: `Building deleted` })
    } catch (err) {
        return res.status(500).json({ error: 'Something went wrong' })
    }
}