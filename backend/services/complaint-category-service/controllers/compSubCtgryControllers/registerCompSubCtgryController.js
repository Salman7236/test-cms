import { ComplaintCategory } from '../../models/ComplaintCategory.js'

export const registerCompSubCtgryController = async (req, res) => {
    const { compid } = req.params;
    const data = req.body;

    try {
        const compCategory = await ComplaintCategory.findById(compid)
        
        if (!compCategory) return res.status(404).json({ error: 'Parent category not found' })

        compCategory.subCategories.push(data)
        await compCategory.save()

        return res.status(201).json({ message: `Complaint Sub Category saved` })
    } catch (err) {
        if (err.code === 11000) {
            return res.status(409).json({ error: "Complaint Sub Category already created" })
        }

        if (err.name === 'ValidationError') return res.status(400).json({ error : 'Fields missing' })

        res.status(500).json({ error: 'Something went wrong' })
    }
}