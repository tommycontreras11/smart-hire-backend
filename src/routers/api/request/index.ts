import { Router } from "express";
import {
  acceptJobController,
    createRequestController,
    deleteRequestController,
    getAllRequestController,
    getOneRequestController,
    updateRequestController,
} from "../../../controllers/request";
import { UuidDTO } from "../../../dto/common.dto";
import { AcceptJobDTO, CreateRequestDTO, UpdateRequestDTO } from "../../../dto/request.dto";
import { validateDTO } from "../../../middlewares/dto/validate-dto.middleware";
import { upload } from "./../../../utils/upload.util";

const router = Router();

router.post("/", upload.single('file'), validateDTO(CreateRequestDTO), createRequestController);
router.post("/accept-job", validateDTO(AcceptJobDTO), acceptJobController);
router.delete("/:uuid", validateDTO(UuidDTO, "params"), deleteRequestController);
router.get("/", getAllRequestController);
router.get("/:uuid", validateDTO(UuidDTO, "params"), getOneRequestController);
router.patch(
  "/:uuid",
  [validateDTO(UuidDTO, "params"), validateDTO(UpdateRequestDTO)],
  updateRequestController
);

export default router;