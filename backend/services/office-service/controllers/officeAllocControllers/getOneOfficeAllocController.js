import mongoose from "mongoose"
import { OfficeAllocation } from "../../models/OfficeAllocation.js"

export const getOneOfficeAllocController = async (req, res) => {
    const { id } = req.params;
    try {
        const officeAlloc = await OfficeAllocation.findById(id)

        if (!officeAlloc) return res.status(404).json({ error: "Office Allocation not found" })

        res.status(200).json({ officeAlloc })
    } catch (err) {
        res.status(500).json({ error: 'Something went wrong' })
    }
}