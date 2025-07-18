import { Complaint } from "../../models/Complaint.js";

export const deleteComplaintController = async (req, res) => {
    const { compid } = req.params;
    
    try {
        const complain = await Complaint.findByIdAndDelete(compid)

        if (!complain) return res.status(404).json({ error: "Complaint not found" })

        return res.status(200).json({ message: `Complaint deleted` })
    } catch (err) {
        return res.status(500).json({ error: 'Something went wrong' })
    }
}