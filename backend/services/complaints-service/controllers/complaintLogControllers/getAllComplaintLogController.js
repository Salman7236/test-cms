import { config as dotenvConfig } from "dotenv"
import { Complaint } from "../../models/Complaint.js";

dotenvConfig()

export const getAllComplaintLogController = async (req, res) => {
    const { compid } = req.params;
    try {
        const complaint = await Complaint.findById(compid);
        
        if (!complaint) return res.status(404).json({ error: "Complaint not found" });

        const complaintLogs = complaint.complaintLogs;

        return res.status(200).json({ complaintLogs })
    } catch (e) {
        res.status(500).json({ error: 'Something went wrong' })
    }
}