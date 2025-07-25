import { Router } from "express";
import {
    createJobSourceController,
    deleteJobSourceController,
    getAllJobSourceController,
    getOneJobSourceController,
    updateJobSourceController,
} from "../../../controllers/job-source";
import { UuidDTO } from "../../../dto/common.dto";
import { CreateJobSourceDTO, UpdateJobSourceDTO } from "../../../dto/job-source.dto";
import { validateDTO } from "../../../middlewares/dto/validate-dto.middleware";

const router = Router();

router.post("/", validateDTO(CreateJobSourceDTO), createJobSourceController);
router.delete("/:uuid", validateDTO(UuidDTO, "params"), deleteJobSourceController);
router.get("/", getAllJobSourceController);
router.get("/:uuid", validateDTO(UuidDTO, "params"), getOneJobSourceController);
router.patch(
  "/:uuid",
  [validateDTO(UuidDTO, "params"), validateDTO(UpdateJobSourceDTO)],
  updateJobSourceController
);

export default router;