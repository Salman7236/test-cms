import mongoose from "mongoose"
import { Office } from "../../models/Office.js"

export const deleteOfficeController = async (req, res) => {
    const { id } = req.params;
    try {
        const office = await Office.findByIdAndDelete(id)

        if (!office) return res.status(404).json({ error: "Office not found" })

        return res.status(200).json({ message: `Office  deleted` })
    } catch (err) {
        return res.status(500).json({ error: 'Something went wrong' })
    }
}