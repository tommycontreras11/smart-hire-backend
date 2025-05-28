import { Router } from "express";
import {
  createJobPositionController,
  deleteJobPositionController,
  getAllJobPositionController,
  getAllRecruitmentProcessController,
  getOneJobPositionController,
  updateJobPositionController,
} from "../../../controllers/job-position";
import { UuidDTO } from "../../../dto/common.dto";
import { CreateJobPositionDTO, UpdateJobPositionDTO } from "../../../dto/job-position.dto";
import { validateDTO } from "../../../middlewares/dto/validate-dto.middleware";

const router = Router();

router.post("/", validateDTO(CreateJobPositionDTO), createJobPositionController);
router.delete("/:uuid", validateDTO(UuidDTO, "params"), deleteJobPositionController);
router.get("/", getAllJobPositionController);
router.get("/recruitment-process", getAllRecruitmentProcessController);
router.get("/:uuid", validateDTO(UuidDTO, "params"), getOneJobPositionController);
router.patch(
  "/:uuid",
  [validateDTO(UuidDTO, "params"), validateDTO(UpdateJobPositionDTO)],
  updateJobPositionController
);

export default router;