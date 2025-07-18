import { ComplaintCategory } from "../../models/ComplaintCategory.js";

export const patchCompTypeController = async (req, res) => {
    const { compid, subid, typeid } = req.params
    const data = req.body
    try {
        const complainCategory = await ComplaintCategory.findById(compid)

        if (!complainCategory) return res.status(404).json({ error: "Complaint category not found" })

        const subCategory = complainCategory.subCategories.find(subcat => subcat._id.toString() === subid)

        if (!subCategory) return res.status(404).json({ error: "Complaint sub category not found" })

        const type = subCategory.complaintTypes.find(t => t._id.toString() === typeid)

        if (!type) return res.status(404).json({ error: "Complaint type not found" })

        Object.assign(type, data)

        await complainCategory.save()

        res.status(200).json({ message: "Data Updated" })
    } catch (err) {
        res.status(500).json({ error: 'Something went wrong' })
    }
}