import { Router } from "express";
import {
  deleteCandidateController,
  getAllCandidateController,
  getOneCandidateController,
  updateCandidateController,
} from "../../../controllers/candidate";
import { UpdateCandidateDTO } from "../../../dto/candidate.dto";
import { UuidDTO } from "../../../dto/common.dto";
import { validateDTO } from "../../../middlewares/dto/validate-dto.middleware";
import {
  createCertificationController,
  deleteCertificationController,
  getOneCertificationController,
  updateCertificationController,
} from "./../../../controllers/certification";
import {
  createEducationController,
  deleteEducationController,
  getOneEducationController,
  updateEducationController,
} from "./../../../controllers/education";
import {
  CreateCertificationDTO,
  UpdateCertificationDTO,
} from "./../../../dto/certification.dto";
import {
  CreateEducationDTO,
  UpdateEducationDTO,
} from "./../../../dto/education.dto";

const router = Router();

router.post(
  "/:candidateUUID/education",
  validateDTO(CreateEducationDTO),
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
  [validateDTO(UuidDTO, "params"), validateDTO(UpdateEducationDTO)],
  updateEducationController
);

router.post(
  "/:candidateUUID/certification",
  validateDTO(CreateCertificationDTO),
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
  [validateDTO(UuidDTO, "params"), validateDTO(UpdateCertificationDTO)],
  updateCertificationController
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
