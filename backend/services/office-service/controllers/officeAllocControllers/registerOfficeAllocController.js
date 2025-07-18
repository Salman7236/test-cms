import mongoose from "mongoose"
import { OfficeAllocation } from "../../models/OfficeAllocation.js"

export const registerOfficeAllocController = async (req, res) => {
    try {
        const officeAlloc = new OfficeAllocation(req.body)
        await officeAlloc.save()
        return res.status(201).json({ message: `Office Allocation ${officeAlloc.userType} saved` })
    } catch (err) {
        if (err.code === 11000 && err.keyPattern?.userName) {
            return res.status(409).json({ error: "Office Allocation already registered" })
        }
        res.status(500).json({ error: 'Something went wrong' })
    }
}