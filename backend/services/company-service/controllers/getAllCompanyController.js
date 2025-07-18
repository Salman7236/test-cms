import mongoose from "mongoose"
import { Company } from "../models/Company.js"

export const getAllCompanyController = async (req, res) => {
    try {
        const companies = await Company.find()
        return res.status(200).json({ companies })
    } catch (e) {
        res.status(500).json({ error: 'Something went wrong' })
    }
}