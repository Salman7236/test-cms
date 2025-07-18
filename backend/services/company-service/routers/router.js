import { Router } from "express";
import { registerCompanyController } from '../controllers/registerCompanyController.js';
import { getAllCompanyController } from '../controllers/getAllCompanyController.js';
import { getOneCompanyController } from '../controllers/getOneCompanyController.js';
import { deleteCompanyController } from '../controllers/deleteCompanyController.js';
import { patchCompanyController } from "../controllers/patchCompanyController.js";

export const router = Router()

router.post('/register', registerCompanyController);

router.get('/', getAllCompanyController);

router.get('/:id', getOneCompanyController)

router.patch('/:id', patchCompanyController);

router.delete('/:id', deleteCompanyController);