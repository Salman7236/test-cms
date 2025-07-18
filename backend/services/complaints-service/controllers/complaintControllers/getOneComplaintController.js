import { Complaint } from "../../models/Complaint.js";

export const getOneComplaintController = async (req, res) => {
    const { compid } = req.params;
    try {
        const complaint = await Complaint.findById(compid)

        if (!complaint) return res.status(404).json({ error: "Complaint not found" })

        res.status(200).json({ complaint })
    } catch (err) {
        res.status(500).json({ error: 'Something went wrong' })
    }
}