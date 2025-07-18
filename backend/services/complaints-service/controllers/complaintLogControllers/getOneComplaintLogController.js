import { Complaint } from "../../models/Complaint.js";

export const getOneComplaintLogController = async (req, res) => {
    const { compid, logid } = req.params;
    try {
        const complaint = await Complaint.findById(compid)

        if (!complaint) return res.status(404).json({ error: "Complaint not found" })

        const complaintLog = complaint.complaintLogs.find(log => log._id.toString() === logid)

        if (!complaintLog) return res.status(404).json({ error: "Complaint log not found" })

        res.status(200).json({ complaintLog })
    } catch (err) {
        res.status(500).json({ error: 'Something went wrong' })
    }
}