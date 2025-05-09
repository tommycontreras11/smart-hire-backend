import { CategoryEntity } from "../../database/entities/entity/category.entity";
import { statusCode } from "../../utils/status.util";

export async function deleteCategoryService(uuid: string) {
  const foundCategory = await CategoryEntity.findOneBy({ uuid }).catch((e) => {
    console.error("updateCategoryService -> CategoryEntity.findOneBy: ", e);
    return null;
  });

  if (!foundCategory) {
    return Promise.reject({
      message: "Category not found",
      status: statusCode.NOT_FOUND,
    });
  }

  await foundCategory.softRemove().catch((e) => {
    console.error("updateCategoryService -> CategoryEntity.update: ", e);
    return null;
  });

  return "Category deleted successfully";
}
