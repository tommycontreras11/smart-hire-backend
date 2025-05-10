import { Router } from "express";
import {
    createCompetencyController,
    deleteCompetencyController,
    getAllCompetencyController,
    getOneCompetencyController,
    updateCompetencyController,
} from "../../../controllers/competency";
import { UuidDTO } from "../../../dto/common.dto";
import { CreateCompetencyDTO, UpdateCompetencyDTO } from "../../../dto/competency.dto";
import { validateDTO } from "../../../middlewares/dto/validate-dto.middleware";

const router = Router();

router.post("/", validateDTO(CreateCompetencyDTO), createCompetencyController);
router.delete("/:uuid", validateDTO(UuidDTO, "params"), deleteCompetencyController);
router.get("/", getAllCompetencyController);
router.get("/:uuid", validateDTO(UuidDTO, "params"), getOneCompetencyController);
router.patch(
  "/:uuid",
  [validateDTO(UuidDTO, "params"), validateDTO(UpdateCompetencyDTO)],
  updateCompetencyController
);

export default router;