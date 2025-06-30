import { Router } from "express";
import {
  deleteCandidateController,
  getAllCandidateController,
  getOneCandidateController,
  updateCandidateController,
} from "../../../controllers/candidate";
import {
  EducationCandidateDTO,
  UpdateCandidateDTO,
} from "../../../dto/candidate.dto";
import { UuidDTO } from "../../../dto/common.dto";
import { validateDTO } from "../../../middlewares/dto/validate-dto.middleware";
import {
  createCertificationController,
  deleteCertificationController,
  getOneCertificationController,
} from "./../../../controllers/certification";
import {
  createEducationController,
  deleteEducationController,
  getOneEducationController,
} from "./../../../controllers/education";

const router = Router();

router.post(
  "/:uuid/education",
  validateDTO(EducationCandidateDTO),
  createEducationController
);
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
router.patch(
  "/:uuid/education",
  [validateDTO(UuidDTO, "params"), validateDTO(EducationCandidateDTO)],
  updateCandidateController
);

router.post(
  "/:uuid/certification",
  validateDTO(EducationCandidateDTO),
  createCertificationController
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
router.patch(
  "/:uuid/certification",
  [validateDTO(UuidDTO, "params"), validateDTO(EducationCandidateDTO)],
  updateCandidateController
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

export default router;
