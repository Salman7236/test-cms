import { ComplaintCategory } from "../../models/ComplaintCategory.js";

export const getOneCompTypeController = async (req, res) => {
    const { compid, subid, typeid } = req.params;
    try {
        const complainCategory = await ComplaintCategory.findById(compid)

        if (!complainCategory) return res.status(404).json({ error: "Complaint category not found" })

        const subCategory = complainCategory.subCategories.find(subcat => subcat._id.toString() === subid)

        if (!subCategory) return res.status(404).json({ error: "Complaint sub category not found" })

        const type = subCategory.complaintTypes.find(type => type._id.toString() === typeid)

        res.status(200).json({ type })
    } catch (err) {
        res.status(500).json({ error: 'Something went wrong' })
    }
}