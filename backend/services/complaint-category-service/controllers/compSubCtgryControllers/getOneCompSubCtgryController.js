import { ComplaintCategory } from "../../models/ComplaintCategory.js";

export const getOneCompSubCtgryController = async (req, res) => {
    const { compid, subid } = req.params;
    try {
        const complainCategory = await ComplaintCategory.findById(compid)

        if (!complainCategory) return res.status(404).json({ error: "Complaint category not found" })

        const subCategory = complainCategory.subCategories.find(subcat => subcat._id.toString() === subid)

        if (!subCategory) return res.status(404).json({ error: "Complaint sub category not found" })

        res.status(200).json({ subCategory })
    } catch (err) {
        res.status(500).json({ error: 'Something went wrong' })
    }
}