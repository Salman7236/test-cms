import mongoose from "mongoose"
import { Office } from "../../models/Office.js"

export const patchOfficeController = async (req, res) => {
    const { id } = req.params
    try {
        const office = await Office.findOneAndUpdate(
            { _id: id }, 
            { $set: req.body }, 
            { new: true, runValidators: true }
        )

        if (!office) return res.status(404).json({ error: "Office not found" })

        res.status(200).json({ message: "Data Updated" })
    } catch (err) {
        res.status(500).json({ error: 'Something went wrong' })
    }
}