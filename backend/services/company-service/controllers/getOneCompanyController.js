import mongoose from "mongoose"
import { Company } from "../models/Company.js"

export const getOneCompanyController = async (req, res) => {
    const { id } = req.params;
    try {
        const company = await Company.findById(id)

        if (!company) return res.status(404).json({ error: "Company not found" })

        res.status(200).json({ company })
    } catch (err) {
        res.status(500).json({ error: 'Something went wrong' })
    }
}