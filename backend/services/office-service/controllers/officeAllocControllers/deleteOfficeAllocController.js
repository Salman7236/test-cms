import mongoose from "mongoose"
import { OfficeAllocation } from "../../models/OfficeAllocation.js"

export const deleteOfficeAllocController = async (req, res) => {
    const { id } = req.params;
    try {
        const office = await OfficeAllocation.findByIdAndDelete(id)

        if (!office) return res.status(404).json({ error: "Office not found" })

        return res.status(200).json({ message: `Office deleted` })
    } catch (err) {
        return res.status(500).json({ error: 'Something went wrong' })
    }
}