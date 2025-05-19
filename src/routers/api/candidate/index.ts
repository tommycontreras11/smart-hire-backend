import { Router } from "express";
import {
  deleteCandidateController,
  getAllCandidateController,
  getOneCandidateController,
  updateCandidateController,
  updateCandidateProfileDetailController
} from "../../../controllers/candidate";
import { UpdateCandidateDTO, UpdateCandidateProfileDetailDTO } from "../../../dto/candidate.dto";
import { UuidDTO } from "../../../dto/common.dto";
import { validateDTO } from "../../../middlewares/dto/validate-dto.middleware";

const router = Router();

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