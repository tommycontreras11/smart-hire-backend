import { Router } from "express";
import {
    createCountryController,
    deleteCountryController,
    getAllCountryController,
    getOneCountryController,
    updateCountryController,
} from "./../../../controllers/country";
import { UuidDTO } from "./../../../dto/common.dto";
import { CreateCountryDTO, UpdateCountryDTO } from "./../../../dto/country.dto";
import { validateDTO } from "./../../../middlewares/dto/validate-dto.middleware";

const router = Router();

router.post("/", validateDTO(CreateCountryDTO), createCountryController);
router.delete("/:uuid", validateDTO(UuidDTO, "params"), deleteCountryController);
router.get("/", getAllCountryController);
router.get("/:uuid", validateDTO(UuidDTO, "params"), getOneCountryController);
router.patch(
  "/:uuid",
  [validateDTO(UuidDTO, "params"), validateDTO(UpdateCountryDTO)],
  updateCountryController
);

export default router;