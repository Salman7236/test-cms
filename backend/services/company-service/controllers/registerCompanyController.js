import { Company } from '../models/Company.js'

export const registerCompanyController = async (req, res) => {
    try {
        const newCompany = new Company(req.body);
        await newCompany.save()
        return res.status(201).json({ message: `Company ${newCompany.companyName} registered` })
    } catch (err) {
        if (err.name === 'ValidationError') return res.status(400).json({ error : 'Fields missing' })
        res.status(500).json({ error: 'Something went wrong' })
    }
}