import { Router } from "express";
import {
    createRecruiterController,
    deleteRecruiterController,
    getAllRecruiterController,
    getOneRecruiterController,
    updateRecruiterController,
} from "../../../controllers/recruiter";
import { UuidDTO } from "../../../dto/common.dto";
import { CreateRecruiterDTO, UpdateRecruiterDTO } from "../../../dto/recruiter.dto";
import { validateDTO } from "../../../middlewares/dto/validate-dto.middleware";

const router = Router();

router.post("/", validateDTO(CreateRecruiterDTO), createRecruiterController);
router.delete("/:uuid", validateDTO(UuidDTO, "params"), deleteRecruiterController);
router.get("/", getAllRecruiterController);
router.get("/:uuid", validateDTO(UuidDTO, "params"), getOneRecruiterController);
router.patch(
  "/:uuid",
  [validateDTO(UuidDTO, "params"), validateDTO(UpdateRecruiterDTO)],
  updateRecruiterController
);

export default router;