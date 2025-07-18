import { ComplaintCategory } from "../../models/ComplaintCategory.js";

export const patchCompCtgryController = async (req, res) => {
    const { id } = req.params
    const data = req.body
    try {
        const complainCategory = await ComplaintCategory.findOneAndUpdate(
            { _id: id }, 
            { $set: data }, 
            { new: true, runValidators: true }
        )

        if (!complainCategory) return res.status(404).json({ error: "Complaint category not found" })

        res.status(200).json({ message: "Data Updated" })
    } catch (err) {
        res.status(500).json({ error: 'Something went wrong' })
    }
}