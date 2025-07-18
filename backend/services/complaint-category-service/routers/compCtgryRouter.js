import { Router } from 'express';
import { compSubCtgryRouter } from './compSubCtgryRouter.js';
import { getAllCompCtgryController } from '../controllers/compCtgryControllers/getAllCompCtgryController.js';
import { registerCompCtgryController } from '../controllers/compCtgryControllers/registerCompCtgryController.js';
import { deleteCompCtgryController } from '../controllers/compCtgryControllers/deleteCompCtgryController.js';
import { getOneCompCtgryController } from '../controllers/compCtgryControllers/getOneCompCtgryController.js';
import { patchCompCtgryController } from '../controllers/compCtgryControllers/patchCompCtgryController.js';

export const compCtgryRouter = Router();

compCtgryRouter.get('/', getAllCompCtgryController)
compCtgryRouter.post('/register', registerCompCtgryController)
compCtgryRouter.get('/:id', getOneCompCtgryController)
compCtgryRouter.patch('/:id', patchCompCtgryController)
compCtgryRouter.delete('/:id', deleteCompCtgryController)
compCtgryRouter.use('/:compid/sub-cat/', compSubCtgryRouter)