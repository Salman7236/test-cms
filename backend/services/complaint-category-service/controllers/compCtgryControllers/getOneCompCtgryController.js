import { ComplaintCategory } from "../../models/ComplaintCategory.js";

export const getOneCompCtgryController = async (req, res) => {
    const { id } = req.params;
    try {
        const complainCategory = await ComplaintCategory.findById(id)

        if (!complainCategory) return res.status(404).json({ error: "Complaint category not found" })

        res.status(200).json({ complainCategory })
    } catch (err) {
        res.status(500).json({ error: 'Something went wrong' })
    }
}