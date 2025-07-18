import mongoose from "mongoose"
import { Company } from "../models/Company.js"

export const patchCompanyController = async (req, res) => {
    const { id } = req.params
    try {
        const company = await Company.findOneAndUpdate(
            { _id: id }, 
            { $set: req.body }, 
            { new: true, runValidators: true }
        )

        if (!company) return res.status(404).json({ error: "Company not found" })

        res.status(200).json({ message: "Data Updated" })
    } catch (err) {
        res.status(500).json({ error: 'Something went wrong' })
    }
}