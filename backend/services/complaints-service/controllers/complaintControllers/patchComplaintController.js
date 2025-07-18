import { Complaint } from "../../models/Complaint.js";
import { registerActionLogController } from "../actionLogControllers/registerActionLogController.js";
import { registerComplaintLogController } from "../complaintLogControllers/registerComplaintLogController.js"

export const patchComplaintController = async (req, res) => {
    const { compid } = req.params
    const { complaintData, actionLogData, complaintLogData } = req.body
    
    try {
        const complaint = await Complaint.findOneAndUpdate(
            { _id: compid }, 
            { $set: complaintData || {} }, 
            { new: true, runValidators: true }
        )
        
        if (!complaint) return res.status(404).json({ error: "Complaint not found" });

        const actionLogRes = registerActionLogController(complaint, actionLogData);
        
        if (actionLogRes.error) return res.status(actionLogRes.status).json({ error: actionLogRes.error })

        const complaintLogRes = registerComplaintLogController(complaint, complaintLogData);
        
        if (complaintLogRes.error) return res.status(complaintLogRes.status).json({ error: complaintLogRes.error })
        
        await complaint.save();

        res.status(200).json({ message: "Data Updated" })
    } catch (err) {
        res.status(500).json({ error: 'Something went wrong' })
    }
}