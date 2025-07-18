import { Router } from 'express';

import { getAllActionLogController } from '../controllers/actionLogControllers/getAllActionLogController.js';
import { registerActionLogController } from '../controllers/actionLogControllers/registerActionLogController.js';
import { getOneActionLogController } from '../controllers/actionLogControllers/getOneActionLogController.js';

export const actionLogRouter = Router({ mergeParams: true });

actionLogRouter.get('/', getAllActionLogController)
actionLogRouter.post('/register', registerActionLogController)
actionLogRouter.get('/:actlogid', getOneActionLogController)