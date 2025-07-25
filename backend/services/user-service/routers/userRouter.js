import { Router } from "express";
import { registerUserController } from "../controllers/userControllers/registerUserController.js";
import { getAllUserController } from "../controllers/userControllers/getAllUserController.js";
import { patchUserController } from "../controllers/userControllers/patchUserController.js";
import { getOneUserController } from "../controllers/userControllers/getOneUserController.js";
import { deleteUserController } from "../controllers/userControllers/deleteUserController.js";

export const usersRouter = Router();

usersRouter.get("/", getAllUserController);
usersRouter.post("/register", registerUserController);
usersRouter.get("/:id", getOneUserController);
usersRouter.patch("/:id", patchUserController);
usersRouter.delete("/:id", deleteUserController);
