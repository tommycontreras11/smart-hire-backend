import { Router } from "express";
import {
    createRequestController,
    deleteRequestController,
    getAllRequestController,
    getOneRequestController,
    updateRequestController,
} from "../../../controllers/request";
import { UuidDTO } from "../../../dto/common.dto";
import { CreateRequestDTO, UpdateRequestDTO } from "../../../dto/request.dto";
import { validateDTO } from "../../../middlewares/dto/validate-dto.middleware";
import { upload } from "./../../../utils/upload.util";

const router = Router();

router.post("/", upload.single('file'), validateDTO(CreateRequestDTO), createRequestController);
router.delete("/:uuid", validateDTO(UuidDTO, "params"), deleteRequestController);
router.get("/", getAllRequestController);
router.get("/:uuid", validateDTO(UuidDTO, "params"), getOneRequestController);
router.patch(
  "/:uuid",
  [validateDTO(UuidDTO, "params"), validateDTO(UpdateRequestDTO)],
  updateRequestController
);

export default router;