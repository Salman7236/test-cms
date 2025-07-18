import { ComplaintCategory } from "../../models/ComplaintCategory.js";

//Check deepmerge after commit
export const patchCompSubCtgryController = async (req, res) => {
    const { compid, subid } = req.params
    const data = req.body
    try {
        const complainCategory = await ComplaintCategory.findById(compid)

        if (!complainCategory) return res.status(404).json({ error: "Complaint category not found" })

        const subCategory = complainCategory.subCategories.find(subcat => subcat._id.toString() === subid)

        if (!subCategory) return res.status(404).json({ error: "Complaint sub category not found" })

        Object.assign(subCategory, data)

        await complainCategory.save()

        res.status(200).json({ message: "Data Updated" })
    } catch (err) {
        res.status(500).json({ error: 'Something went wrong' })
    }
}