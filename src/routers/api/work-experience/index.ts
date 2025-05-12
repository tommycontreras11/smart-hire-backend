import { Router } from "express";
import {
  deleteWorkExperienceController,
  getAllWorkExperienceController,
  getOneWorkExperienceController
} from "../../../controllers/work-experience";
import { UuidDTO } from "../../../dto/common.dto";
import { validateDTO } from "../../../middlewares/dto/validate-dto.middleware";

const router = Router();

router.delete("/:uuid", validateDTO(UuidDTO, "params"), deleteWorkExperienceController);
router.get("/", getAllWorkExperienceController);
router.get("/:uuid", validateDTO(UuidDTO, "params"), getOneWorkExperienceController);

export default router;