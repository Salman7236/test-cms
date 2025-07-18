import { Router } from 'express';
import { compTypeRouter } from './compTypeRouter.js';
import { getAllCompSubCtgryController } from '../controllers/compSubCtgryControllers/getAllCompSubCtgryController.js';
import { registerCompSubCtgryController } from '../controllers/compSubCtgryControllers/registerCompSubCtgryController.js';
import { deleteCompSubCtgryController } from '../controllers/compSubCtgryControllers/deleteCompSubCtgryController.js';
import { getOneCompSubCtgryController } from '../controllers/compSubCtgryControllers/getOneCompSubCtgryController.js';
import { patchCompSubCtgryController } from '../controllers/compSubCtgryControllers/patchCompSubCtgryController.js';

export const compSubCtgryRouter = Router({ mergeParams: true });

compSubCtgryRouter.get('/', getAllCompSubCtgryController)
compSubCtgryRouter.post('/register', registerCompSubCtgryController)
compSubCtgryRouter.get('/:subid', getOneCompSubCtgryController)
compSubCtgryRouter.patch('/:subid', patchCompSubCtgryController)
compSubCtgryRouter.delete('/:subid', deleteCompSubCtgryController)
compSubCtgryRouter.use('/:subid/type/', compTypeRouter)