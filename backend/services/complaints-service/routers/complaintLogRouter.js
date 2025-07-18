import { Router } from 'express';

import { getAllComplaintLogController } from '../controllers/complaintLogControllers/getAllComplaintLogController.js';
import { registerComplaintLogController } from '../controllers/complaintLogControllers/registerComplaintLogController.js';
import { getOneComplaintLogController } from '../controllers/complaintLogControllers/getOneComplaintLogController.js';

export const complaintLogRouter = Router({ mergeParams: true });

complaintLogRouter.get('/', getAllComplaintLogController)
complaintLogRouter.post('/register', registerComplaintLogController)
complaintLogRouter.get('/:logid', getOneComplaintLogController)