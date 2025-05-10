import { Router } from "express";
import {
    createDepartmentController,
    deleteDepartmentController,
    getAllDepartmentController,
    getOneDepartmentController,
    updateDepartmentController,
} from "../../../controllers/department";
import { UuidDTO } from "../../../dto/common.dto";
import { CreateDepartmentDTO, UpdateDepartmentDTO } from "../../../dto/department.dto";
import { validateDTO } from "../../../middlewares/dto/validate-dto.middleware";

const router = Router();

router.post("/", validateDTO(CreateDepartmentDTO), createDepartmentController);
router.delete("/:uuid", validateDTO(UuidDTO, "params"), deleteDepartmentController);
router.get("/", getAllDepartmentController);
router.get("/:uuid", validateDTO(UuidDTO, "params"), getOneDepartmentController);
router.patch(
  "/:uuid",
  [validateDTO(UuidDTO, "params"), validateDTO(UpdateDepartmentDTO)],
  updateDepartmentController
);

export default router;