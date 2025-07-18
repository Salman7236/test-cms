import { ComplaintCategory } from "../../models/ComplaintCategory.js";

export const deleteCompCtgryController = async (req, res) => {
    const { id } = req.params;
    try {
        const complainCategory = await ComplaintCategory.findByIdAndDelete(id)

        if (!complainCategory) return res.status(404).json({ error: "Complaint category not found" })

        return res.status(200).json({ message: `Complaint category deleted` })
    } catch (err) {
        return res.status(500).json({ error: 'Something went wrong' })
    }
}