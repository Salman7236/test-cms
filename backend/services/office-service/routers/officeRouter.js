import { Router } from "express";
import { registerOfficeController } from "../controllers/officeControllers/registerOfficeController.js";
import { getAllOfficeController } from "../controllers/officeControllers/getAllOfficeController.js";
import { patchOfficeController } from "../controllers/officeControllers/patchOfficeController.js";
import { getOneOfficeController } from "../controllers/officeControllers/getOneOfficeController.js";
import { deleteOfficeController } from "../controllers/officeControllers/deleteOfficeController.js";

export const officeRouter = Router();

officeRouter.get('/', getAllOfficeController)
officeRouter.post('/register', registerOfficeController)
officeRouter.get('/:id', getOneOfficeController)
officeRouter.patch('/:id', patchOfficeController)
officeRouter.delete('/:id', deleteOfficeController)