import { Router } from "express";
import { authRouter } from "./authRouter.js";
import { usersRouter } from "./userRouter.js";
import { userTypeRouter } from "./userTypeRouter.js";
import { accessUsersPolicy } from "../policy/userAuthPolicy.js";
import { authorizeUserLevel } from "../../../shared/auth/authorizeUserLevel.js";
import { extractUserMiddleware } from "../../../shared/middleware/extractUserMiddleware.js";

export const router = Router();

router.use('/auth', authRouter);

router.use('/users', extractUserMiddleware, authorizeUserLevel(3), accessUsersPolicy, usersRouter);

router.use('/user-types', extractUserMiddleware, authorizeUserLevel(3), accessUsersPolicy, userTypeRouter);