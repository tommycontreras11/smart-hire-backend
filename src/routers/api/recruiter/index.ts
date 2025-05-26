import { Router } from "express";
import {
  deleteRecruiterController,
  getAllRecruiterController,
  getAllDashboardDetailController,
  getOneRecruiterController,
  updateRecruiterController
} from "../../../controllers/recruiter";
import { UuidDTO } from "../../../dto/common.dto";
import { UpdateRecruiterDTO } from "../../../dto/recruiter.dto";
import { validateDTO } from "../../../middlewares/dto/validate-dto.middleware";

const router = Router();

router.delete("/:uuid", validateDTO(UuidDTO, "params"), deleteRecruiterController);
router.get("/", getAllRecruiterController);
router.get("/dashboard-detail", getAllDashboardDetailController);
router.get("/:uuid", validateDTO(UuidDTO, "params"), getOneRecruiterController);
router.patch(
  "/:uuid",
  [validateDTO(UuidDTO, "params"), validateDTO(UpdateRecruiterDTO)],
  updateRecruiterController
);

export default router;