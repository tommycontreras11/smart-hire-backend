import { Router } from "express";
import {
    createEvaluationMethodController,
    deleteEvaluationMethodController,
    getAllEvaluationMethodController,
    getOneEvaluationMethodController,
    updateEvaluationMethodController,
} from "../../../controllers/evaluation-method";
import { UuidDTO } from "../../../dto/common.dto";
import { CreateEvaluationMethodDTO, UpdateEvaluationMethodDTO } from "../../../dto/evaluation-method.dto";
import { validateDTO } from "../../../middlewares/dto/validate-dto.middleware";

const router = Router();

router.post("/", validateDTO(CreateEvaluationMethodDTO), createEvaluationMethodController);
router.delete("/:uuid", validateDTO(UuidDTO, "params"), deleteEvaluationMethodController);
router.get("/", getAllEvaluationMethodController);
router.get("/:uuid", validateDTO(UuidDTO, "params"), getOneEvaluationMethodController);
router.patch(
  "/:uuid",
  [validateDTO(UuidDTO, "params"), validateDTO(UpdateEvaluationMethodDTO)],
  updateEvaluationMethodController
);

export default router;