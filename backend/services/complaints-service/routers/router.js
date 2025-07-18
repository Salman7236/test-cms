import { Router } from 'express';

import { getAllComplaintController } from '../controllers/complaintControllers/getAllComplaintController.js';
import { registerComplaintController } from '../controllers/complaintControllers/registerComplaintController.js';
import { complaintsIdRouter } from './complaintsIdRouter.js';

export const router = Router({ mergeParams: true });

router.get('/', getAllComplaintController)
router.post('/register', registerComplaintController)
router.use('/:compid', complaintsIdRouter)