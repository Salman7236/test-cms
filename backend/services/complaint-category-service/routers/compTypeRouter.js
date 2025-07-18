import { Router } from 'express';
import { getAllCompTypeController } from '../controllers/compTypeControllers/getAllCompTypeController.js';
import { registerCompTypeController } from '../controllers/compTypeControllers/registerCompTypeController.js';
import { deleteCompTypeController } from '../controllers/compTypeControllers/deleteCompTypeController.js';
import { getOneCompTypeController } from '../controllers/compTypeControllers/getOneCompTypeController.js';
import { patchCompTypeController } from '../controllers/compTypeControllers/patchCompTypeController.js';

export const compTypeRouter = Router({ mergeParams: true });

compTypeRouter.get('/', getAllCompTypeController)
compTypeRouter.post('/register', registerCompTypeController)
compTypeRouter.get('/:typeid', getOneCompTypeController)
compTypeRouter.patch('/:typeid', patchCompTypeController)
compTypeRouter.delete('/:typeid', deleteCompTypeController)