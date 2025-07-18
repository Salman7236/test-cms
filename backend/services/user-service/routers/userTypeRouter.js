import { Router } from "express";
import { registerUserTypeController } from "../controllers/userTypeControllers/registerUserTypeController.js";
import { getAllUserTypeController } from "../controllers/userTypeControllers/getAllUserTypeController.js";
import { patchUserTypeController } from "../controllers/userTypeControllers/patchUserTypeController.js";
import { getOneUserTypeController } from "../controllers/userTypeControllers/getOneUserTypeController.js";
import { deleteUserTypeController } from "../controllers/userTypeControllers/deleteUserTypeController.js";

export const userTypeRouter = Router();

userTypeRouter.get('/', getAllUserTypeController)
userTypeRouter.post('/register', registerUserTypeController)
userTypeRouter.get('/:id', getOneUserTypeController)
userTypeRouter.patch('/:id', patchUserTypeController)
userTypeRouter.delete('/:id', deleteUserTypeController)