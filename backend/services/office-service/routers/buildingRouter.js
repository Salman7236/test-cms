import { Router } from "express";
import { registerBuildingController } from "../controllers/buildingControllers/registerBuildingController.js";
import { getAllBuildingController } from "../controllers/buildingControllers/getAllBuildingController.js";
import { patchBuildingController } from "../controllers/buildingControllers/patchBuildingController.js";
import { getOneBuildingController } from "../controllers/buildingControllers/getOneBuildingController.js";
import { deleteBuildingController } from "../controllers/buildingControllers/deleteBuildingController.js";

export const buildingRouter = Router();

buildingRouter.get('/', getAllBuildingController)
buildingRouter.post('/register', registerBuildingController)
buildingRouter.get('/:id', getOneBuildingController)
buildingRouter.patch('/:id', patchBuildingController)
buildingRouter.delete('/:id', deleteBuildingController)