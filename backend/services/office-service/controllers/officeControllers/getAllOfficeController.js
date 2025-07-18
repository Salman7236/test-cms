import mongoose from "mongoose"
import { Office } from "../../models/Office.js"

export const getAllOfficeController = async (req, res) => {
    try {
        const office = await Office.find()
        return res.status(200).json({ office })
    } catch (e) {
        res.status(500).json({ error: 'Something went wrong' })
    }
}