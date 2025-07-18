import { Complaint } from "../../models/Complaint.js";

export const getOneActionLogController = async (req, res) => {
    const { compid, actlogid } = req.params;
    try {
        const complaint = await Complaint.findById(compid)

        if (!complaint) return res.status(404).json({ error: "Complaint not found" })

        const actionLog = complaint.actionLogs.find(log => log._id.toString() === actlogid)

        if (!actionLog) return res.status(404).json({ error: "Action log not found" })

        res.status(200).json({ actionLog })
    } catch (err) {
        res.status(500).json({ error: 'Something went wrong' })
    }
}