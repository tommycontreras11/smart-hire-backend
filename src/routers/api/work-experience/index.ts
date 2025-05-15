import { Router } from "express";
import {
  createWorkExperienceController,
  deleteWorkExperienceController,
  getAllWorkExperienceController,
  getOneWorkExperienceController,
} from "../../../controllers/work-experience";
import { UuidDTO } from "../../../dto/common.dto";
import { validateDTO } from "../../../middlewares/dto/validate-dto.middleware";
import { CreateWorkExperienceDTO } from "./../../../dto/work-experience.dto";

const router = Router();

router.post(
  "/",
  validateDTO(CreateWorkExperienceDTO),
  createWorkExperienceController
);
router.delete(
  "/:uuid",
  validateDTO(UuidDTO, "params"),
  deleteWorkExperienceController
);
router.get("/", getAllWorkExperienceController);
router.get(
  "/:uuid",
  validateDTO(UuidDTO, "params"),
  getOneWorkExperienceController
);
router.patch(
  "/:uuid",
  [validateDTO(UuidDTO, "params"), validateDTO(CreateWorkExperienceDTO)],
  getOneWorkExperienceController
);

export default router;
