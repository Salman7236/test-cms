import { ComplaintCategory } from "../../models/ComplaintCategory.js"

export const getAllCompCtgryController = async (req, res) => {
    try {
        const complainCategory = await ComplaintCategory.find()
        return res.status(200).json({ complainCategory })
    } catch (e) {
        res.status(500).json({ error: 'Something went wrong' })
    }
}