import { ComplaintCategory } from '../../models/ComplaintCategory.js'

export const registerCompTypeController = async (req, res) => {
    const { compid, subid } = req.params;
    const data = req.body;

    try {
        const compCategory = await ComplaintCategory.findById(compid)
        
        if (!compCategory) return res.status(404).json({ error: 'Parent category not found' })

        const subCategory = compCategory.subCategories.find(subcat => subcat._id.toString() === subid)

        if (!subCategory) return res.status(404).json({ error: "Complaint sub category not found" })

        subCategory.complaintTypes.push(data)
        await compCategory.save()
        

        return res.status(201).json({ message: `Complaint Type saved` })
    } catch (err) {
        if (err.code === 11000) {
            return res.status(409).json({ error: "Complaint Type already created" })
        }

        if (err.name === 'ValidationError') return res.status(400).json({ error : 'Fields missing' })

        res.status(500).json({ error: 'Something went wrong' })
    }
}