import mongoose from "mongoose"
import { Company } from '../models/Company.js'

export const deleteCompanyController = async (req, res) => {
    const { id } = req.params;
    try {
        const company = await Company.findByIdAndDelete(id)

        if (!company) return res.status(404).json({ error: "Company not found" })

        return res.status(200).json({ message: `Company deleted` })
    } catch (err) {
        return res.status(500).json({ error: 'Something went wrong' })
    }
}