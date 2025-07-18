import mongoose from "mongoose"
import { Office } from "../../models/Office.js"

export const getOneOfficeController = async (req, res) => {
    const { id } = req.params;
    try {
        const office = await Office.findById(id)

        if (!office) return res.status(404).json({ error: "Office not found" })

        res.status(200).json({ office })
    } catch (err) {
        res.status(500).json({ error: 'Something went wrong' })
    }
}