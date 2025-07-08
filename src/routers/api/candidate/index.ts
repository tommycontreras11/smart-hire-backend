import { Router } from "express";
import {
  deleteCandidateController,
  getAllCandidateController,
  getOneCandidateController,
  updateCandidateController,
  updateCandidateProfileController,
} from "../../../controllers/candidate";
import {
  UpdateCandidateDTO,
  UpdateCandidateProfileDTO,
} from "../../../dto/candidate.dto";
import { UuidDTO } from "../../../dto/common.dto";
import { validateDTO } from "../../../middlewares/dto/validate-dto.middleware";
import {
  deleteCertificationController,
  getOneCertificationController,
} from "./../../../controllers/certification";
import {
  deleteEducationController,
  getOneEducationController,
} from "./../../../controllers/education";

const router = Router();

router.delete(
  "/:uuid/education",
  validateDTO(UuidDTO, "params"),
  deleteEducationController
);
router.get(
  "/:uuid/education",
  validateDTO(UuidDTO, "params"),
  getOneEducationController
);

router.delete(
  "/:uuid/certification",
  validateDTO(UuidDTO, "params"),
  deleteCertificationController
);
router.get(
  "/:uuid/certification",
  validateDTO(UuidDTO, "params"),
  getOneCertificationController
);

router.delete(
  "/:uuid",
  validateDTO(UuidDTO, "params"),
  deleteCandidateController
);
router.get("/", getAllCandidateController);
router.get("/:uuid", validateDTO(UuidDTO, "params"), getOneCandidateController);
router.patch(
  "/:uuid",
  [validateDTO(UuidDTO, "params"), validateDTO(UpdateCandidateDTO)],
  updateCandidateController
);
router.patch(
  "/:uuid/profile",
  validateDTO(UpdateCandidateProfileDTO),
  updateCandidateProfileController
);

export default router;
