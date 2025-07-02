import { Router } from "express";
import {
    createAcademicDisciplineController,
    deleteAcademicDisciplineController,
    getAllAcademicDisciplineController,
    getOneAcademicDisciplineController,
    updateAcademicDisciplineController,
} from "../../../controllers/academic-discipline";
import { UuidDTO } from "../../../dto/common.dto";
import { CreateAcademicDisciplineDTO, UpdateAcademicDisciplineDTO } from "../../../dto/academic-discipline.dto";
import { validateDTO } from "../../../middlewares/dto/validate-dto.middleware";

const router = Router();

router.post("/", validateDTO(CreateAcademicDisciplineDTO), createAcademicDisciplineController);
router.delete("/:uuid", validateDTO(UuidDTO, "params"), deleteAcademicDisciplineController);
router.get("/", getAllAcademicDisciplineController);
router.get("/:uuid", validateDTO(UuidDTO, "params"), getOneAcademicDisciplineController);
router.patch(
  "/:uuid",
  [validateDTO(UuidDTO, "params"), validateDTO(UpdateAcademicDisciplineDTO)],
  updateAcademicDisciplineController
);

export default router;