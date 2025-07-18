import mongoose from "mongoose"
import { OfficeAllocation } from "../../models/OfficeAllocation.js"

export const patchOfficeAllocController = async (req, res) => {
    const { id } = req.params
    try {
        const officeAlloc = await OfficeAllocation.findOneAndUpdate(
            { _id: id }, 
            { $set: req.body }, 
            { new: true, runValidators: true }
        )

        if (!officeAlloc) return res.status(404).json({ error: "Office Allocation not found" })

        res.status(200).json({ message: "Data Updated" })
    } catch (err) {
        res.status(500).json({ error: 'Something went wrong' })
    }
}