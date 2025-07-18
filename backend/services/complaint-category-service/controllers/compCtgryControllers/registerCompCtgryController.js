import { ComplaintCategory } from '../../models/ComplaintCategory.js'

export const registerCompCtgryController = async (req, res) => {
    const data = req.body
    try {
        const compCategory = new ComplaintCategory(data)
        await compCategory.save()
        return res.status(201).json({ message: `Complaint Category ${compCategory.category} saved` })
    } catch (err) {
        if (err.code === 11000 && err.keyPattern?.category) {
            return res.status(409).json({ error: "Complaint Category already created" })
        }

        if (err.name === 'ValidationError') return res.status(400).json({ error : 'Fields missing' })

        res.status(500).json({ error: 'Something went wrong' })
    }
}