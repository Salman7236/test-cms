import { Router } from 'express';

import { deleteComplaintController } from '../controllers/complaintControllers/deleteComplaintController.js';
import { getOneComplaintController } from '../controllers/complaintControllers/getOneComplaintController.js';
import { patchComplaintController } from '../controllers/complaintControllers/patchComplaintController.js';
import { commentRouter } from './commentRouter.js';
import { complaintLogRouter } from './complaintLogRouter.js';
import { actionLogRouter } from './actionLogRouter.js';

export const complaintsIdRouter = Router({ mergeParams: true });

complaintsIdRouter.get('/', getOneComplaintController)
complaintsIdRouter.patch('/', patchComplaintController)
complaintsIdRouter.delete('/', deleteComplaintController)
complaintsIdRouter.use('/comments', commentRouter)
complaintsIdRouter.use('/complaint-logs', complaintLogRouter)
complaintsIdRouter.use('/action-logs', actionLogRouter)