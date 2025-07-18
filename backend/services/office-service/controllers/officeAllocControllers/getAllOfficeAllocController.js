import mongoose from "mongoose"
import { OfficeAllocation } from "../../models/OfficeAllocation.js"

export const getAllOfficeAllocController = async (req, res) => {
    try {
        const officeAlloc = await OfficeAllocation.find()
        return res.status(200).json({ officeAlloc })
    } catch (e) {
        res.status(500).json({ error: 'Something went wrong' })
    }
}