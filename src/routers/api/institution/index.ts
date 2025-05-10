import { Router } from "express";
import {
    createInstitutionController,
    deleteInstitutionController,
    getAllInstitutionController,
    getOneInstitutionController,
    updateInstitutionController,
} from "../../../controllers/institution";
import { UuidDTO } from "../../../dto/common.dto";
import { CreateInstitutionDTO, UpdateInstitutionDTO } from "../../../dto/institution.dto";
import { validateDTO } from "../../../middlewares/dto/validate-dto.middleware";

const router = Router();

router.post("/", validateDTO(CreateInstitutionDTO), createInstitutionController);
router.delete("/:uuid", validateDTO(UuidDTO, "params"), deleteInstitutionController);
router.get("/", getAllInstitutionController);
router.get("/:uuid", validateDTO(UuidDTO, "params"), getOneInstitutionController);
router.patch(
  "/:uuid",
  [validateDTO(UuidDTO, "params"), validateDTO(UpdateInstitutionDTO)],
  updateInstitutionController
);

export default router;