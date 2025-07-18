import { Complaint } from '../../models/Complaint.js'
import { registerActionLogController } from '../actionLogControllers/registerActionLogController.js';
import { registerComplaintLogController } from '../complaintLogControllers/registerComplaintLogController.js';

export const registerComplaintController = async (req, res) => {
    const { complaintData, actionLogData, complaintLogData } = req.body;
    try {
        const complaint = new Complaint(complaintData);

        if (!complaint) return res.status(400).json({ error: "Could not create complaint" })

        const categoryId = complaint.complaintTypeId;

        const userIdPromise = findUserId(categoryId);

        const actionLogRes = registerActionLogController(complaint, actionLogData);
        
        if (actionLogRes.error) return res.status(actionLogRes.status).json({ error: actionLogRes.error })
            
        const userId = await userIdPromise;
            
        if (userId.error) res.status(userId.status).json({ error: userId.error });

        complaintLogData.markTo = userId;

        const complaintLogRes = registerComplaintLogController(complaint, complaintLogData);

        if (complaintLogRes.error) return res.status(complaintLogRes.status).json({ error: complaintLogRes.error })

        await complaint.save();

        return res.status(201).json({ message: `Complaint saved` });
    } catch (err) {
        if (err.name === 'ValidationError') return res.status(400).json({ error : 'Fields missing' })

        res.status(500).json({ error: 'Something went wrong' })
    }
}

const findUserId = async (categoryId) => {
    try {
        const response = await fetch(`${process.env.API_GATEWAY_SERVER}/complaint-categories/${categoryId}`);
        
        const category = await response.json()
        
        const userId = category.complainCategory.activeUserId;
    
        return userId;

    } catch (err) {
        if (err.status === 404) return { error: "Could not find category" }
    }

}