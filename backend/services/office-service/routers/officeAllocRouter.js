import { Router } from "express";
import { registerOfficeAllocController } from "../controllers/officeAllocControllers/registerOfficeAllocController.js";
import { getAllOfficeAllocController } from "../controllers/officeAllocControllers/getAllOfficeAllocController.js";
import { patchOfficeAllocController } from "../controllers/officeAllocControllers/patchOfficeAllocController.js";
import { getOneOfficeAllocController } from "../controllers/officeAllocControllers/getOneOfficeAllocController.js";
import { deleteOfficeAllocController } from "../controllers/officeAllocControllers/deleteOfficeAllocController.js";

export const officeAllocRouter = Router();

officeAllocRouter.get('/', getAllOfficeAllocController)
officeAllocRouter.post('/register', registerOfficeAllocController)
officeAllocRouter.get('/:id', getOneOfficeAllocController)
officeAllocRouter.patch('/:id', patchOfficeAllocController)
officeAllocRouter.delete('/:id', deleteOfficeAllocController)