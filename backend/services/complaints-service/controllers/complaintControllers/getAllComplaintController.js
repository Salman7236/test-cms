import { Complaint } from "../../models/Complaint.js"
import { accessComplaintPolicy } from "../../policy/complaintAuthPolicy.js"

export const getAllComplaintController = async (req, res) => {
    try {
        const user = req.user
        const filters = accessComplaintPolicy(user)
        console.log(filters)
        // const filters = { "complaintTypeId": "f2d75f591269ed23150bbc96" }
        const complaints = await Complaint.find(filters)
        return res.status(200).json({ complaints })
    } catch (e) {
        res.status(500).json({ error: 'Something went wrong' })
    }
}