import { statusCode } from "../../utils/status.util";
import { CategoryEntity } from "../../database/entities/entity/category.entity";
import { FindManyOptions } from "typeorm";

export async function getAllCategoryService(
  options?: FindManyOptions<CategoryEntity>
) {
  const categories = await CategoryEntity.find(options).catch((e) => {
    console.error("getAllCategoryService -> CategoryEntity.find: ", e);
    return null;
  });

  if (!categories)
    return Promise.reject({
      message: "No categories found",
      status: statusCode.NOT_FOUND,
    });

  return categories;
}