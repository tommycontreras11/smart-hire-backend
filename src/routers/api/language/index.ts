import { Router } from "express";
import {
    createLanguageController,
    deleteLanguageController,
    getAllLanguageController,
    getOneLanguageController,
    updateLanguageController,
} from "../../../controllers/language";
import { UuidDTO } from "../../../dto/common.dto";
import { CreateLanguageDTO, UpdateLanguageDTO } from "../../../dto/language.dto";
import { validateDTO } from "../../../middlewares/dto/validate-dto.middleware";

const router = Router();

router.post("/", validateDTO(CreateLanguageDTO), createLanguageController);
router.delete("/:uuid", validateDTO(UuidDTO, "params"), deleteLanguageController);
router.get("/", getAllLanguageController);
router.get("/:uuid", validateDTO(UuidDTO, "params"), getOneLanguageController);
router.patch(
  "/:uuid",
  [validateDTO(UuidDTO, "params"), validateDTO(UpdateLanguageDTO)],
  updateLanguageController
);

export default router;