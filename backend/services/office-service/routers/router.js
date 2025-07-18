import { Router } from "express";
import { officeRouter } from "./officeRouter.js";
import { officeAllocRouter } from "./officeAllocRouter.js";
import { buildingRouter } from "./buildingRouter.js";

export const router = Router();

router.use('/offices', officeRouter)
router.use('/office-alloc', officeAllocRouter)
router.use('/buildings', buildingRouter)