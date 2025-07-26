import { ComplaintCategory } from "../../models/ComplaintCategory.js";

export const getCompleteSubCtgry = async (req, res) => {
    try {
        const complaintCategories = await ComplaintCategory.find().lean();

        const completeSubCategories = complaintCategories.flatMap(cat => {
            cat.subCategories.map(sub => ({
                catId: cat._id,
                category: cat.category,
                subCategory: sub
            }))
        })

        res.status(200).json({ completeSubCategories })
    } catch (err) {
        res.status(500).json({ error: 'Something went wrong' })
    }
}