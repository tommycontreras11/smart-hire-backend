import { Router } from "express";
import {
    createPositionTypeController,
    deletePositionTypeController,
    getAllPositionTypeController,
    getOnePositionTypeController,
    updatePositionTypeController,
} from "../../../controllers/position-type";
import { UuidDTO } from "../../../dto/common.dto";
import { CreatePositionTypeDTO, UpdatePositionTypeDTO } from "../../../dto/position-type.dto";
import { validateDTO } from "../../../middlewares/dto/validate-dto.middleware";

const router = Router();

router.post("/", validateDTO(CreatePositionTypeDTO), createPositionTypeController);
router.delete("/:uuid", validateDTO(UuidDTO, "params"), deletePositionTypeController);
router.get("/", getAllPositionTypeController);
router.get("/:uuid", validateDTO(UuidDTO, "params"), getOnePositionTypeController);
router.patch(
  "/:uuid",
  [validateDTO(UuidDTO, "params"), validateDTO(UpdatePositionTypeDTO)],
  updatePositionTypeController
);

export default router;