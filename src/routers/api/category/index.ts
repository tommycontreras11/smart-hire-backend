import { Router } from "express";
import {
    createCategoryController,
    deleteCategoryController,
    getAllCategoryController,
    getOneCategoryController,
    updateCategoryController,
} from "../../../controllers/category";
import { UuidDTO } from "../../../dto/common.dto";
import { CreateCategoryDTO, UpdateCategoryDTO } from "../../../dto/category.dto";
import { validateDTO } from "../../../middlewares/dto/validate-dto.middleware";

const router = Router();

router.post("/", validateDTO(CreateCategoryDTO), createCategoryController);
router.delete("/:uuid", validateDTO(UuidDTO, "params"), deleteCategoryController);
router.get("/", getAllCategoryController);
router.get("/:uuid", validateDTO(UuidDTO, "params"), getOneCategoryController);
router.patch(
  "/:uuid",
  [validateDTO(UuidDTO, "params"), validateDTO(UpdateCategoryDTO)],
  updateCategoryController
);

export default router;