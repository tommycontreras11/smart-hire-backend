import { Router } from "express";
import {
    createTrainingController,
    deleteTrainingController,
    getAllTrainingController,
    getOneTrainingController,
    updateTrainingController,
} from "../../../controllers/training";
import { UuidDTO } from "../../../dto/common.dto";
import { CreateTrainingDTO, UpdateTrainingDTO } from "../../../dto/training.dto";
import { validateDTO } from "../../../middlewares/dto/validate-dto.middleware";

const router = Router();

router.post("/", validateDTO(CreateTrainingDTO), createTrainingController);
router.delete("/:uuid", validateDTO(UuidDTO, "params"), deleteTrainingController);
router.get("/", getAllTrainingController);
router.get("/:uuid", validateDTO(UuidDTO, "params"), getOneTrainingController);
router.patch(
  "/:uuid",
  [validateDTO(UuidDTO, "params"), validateDTO(UpdateTrainingDTO)],
  updateTrainingController
);

export default router;