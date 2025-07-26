import { ComplaintCategory } from "../../models/ComplaintCategory.js";

export const getCompleteType = async (req, res) => {
    try {
        const complaintCategories = await ComplaintCategory.find().lean();

        const complaintTypes = complaintCategories.flatMap(cat => {
            cat.subCategories.flatMap(sub => 
                sub.subCategories.map(type => ({
                    subId: sub._id,
                    subCategory: sub.subCategory,
                    type: type
                }))
            )
        })

        res.status(200).json({ complaintTypes })
    } catch (err) {
        res.status(500).json({ error: 'Something went wrong' })
    }
}