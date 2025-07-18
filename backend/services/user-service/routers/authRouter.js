import { Router } from "express";
import { authController } from "../controllers/authControllers/authController.js";

export const authRouter = Router();


authRouter.post('/login', authController)