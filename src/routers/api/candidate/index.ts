import { Router } from "express";
import {
    createCandidateController,
    deleteCandidateController,
    getAllCandidateController,
    getOneCandidateController,
    updateCandidateController,
    updateCandidateProfileDetailController,
} from "../../../controllers/candidate";
import { UuidDTO } from "../../../dto/common.dto";
import { CreateCandidateDTO, UpdateCandidateDTO, UpdateCandidateProfileDetailDTO } from "../../../dto/candidate.dto";
import { validateDTO } from "../../../middlewares/dto/validate-dto.middleware";

const router = Router();

router.post("/", validateDTO(CreateCandidateDTO), createCandidateController);
router.delete("/:uuid", validateDTO(UuidDTO, "params"), deleteCandidateController);
router.get("/", getAllCandidateController);
router.get("/:uuid", validateDTO(UuidDTO, "params"), getOneCandidateController);
router.patch(
  "/:uuid",
  [validateDTO(UuidDTO, "params"), validateDTO(UpdateCandidateDTO)],
  updateCandidateController
);
router.patch(
  "/:uuid/profile-details",
  [validateDTO(UuidDTO, "params"), validateDTO(UpdateCandidateProfileDetailDTO)],
  updateCandidateProfileDetailController
);

export default router;