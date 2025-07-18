import { ComplaintCategory } from "../../models/ComplaintCategory.js";

export const deleteCompTypeController = async (req, res) => {
    const { compid, subid, typeid } = req.params;
    try {
        const result = await ComplaintCategory.updateOne(
            { _id: compid },
            {
                "$pull": {
                    "subCategories.$[subcat].complaintTypes": { _id: typeid }
                }
            },
            {
                arrayFilters: [
                    { "subcat._id": subid }
                ]
            }
        )

        if (result.modifiedCount === 0) return res.status(404).json({ error: "Matching category not found" })

        if (result.matchedCount === 0) return res.status(400).json({ error: "Invalid query" })

        return res.status(200).json({ message: `Complaint category deleted` })
    } catch (err) {
        return res.status(500).json({ error: 'Something went wrong' })
    }
}