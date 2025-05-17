import { Router } from "express";
import {
  deleteEmployeeController,
  getAllEmployeeController,
  getOneEmployeeController,
  updateEmployeeController
} from "../../../controllers/employee";
import { UpdateEmployeeDTO } from "../../../dto/employee.dto";
import { UuidDTO } from "../../../dto/common.dto";
import { validateDTO } from "../../../middlewares/dto/validate-dto.middleware";

const router = Router();

router.delete("/:uuid", validateDTO(UuidDTO, "params"), deleteEmployeeController);
router.get("/", getAllEmployeeController);
router.get("/:uuid", validateDTO(UuidDTO, "params"), getOneEmployeeController);
router.patch(
  "/:uuid",
  [validateDTO(UuidDTO, "params"), validateDTO(UpdateEmployeeDTO)],
  updateEmployeeController
);

export default router;