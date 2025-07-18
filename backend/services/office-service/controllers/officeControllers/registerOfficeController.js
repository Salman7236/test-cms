import mongoose from "mongoose"
import { Office } from "../../models/Office.js"

export const registerOfficeController = async (req, res) => {
    try {
        const office = new Office(req.body)
        await office.save()
        return res.status(201).json({ message: `Office  ${office.officeNo} saved` })
    } catch (err) {
        if (err.code === 11000 && err.keyPattern?.officeNo) {
            return res``.status(409).json({ error: "Office already registered" })
        }
        
        if (err.name === 'ValidationError') return res.status(400).json({ error : 'Fields missing' })

        res.status(500).json({ error: 'Something went wrong' })
    }
}