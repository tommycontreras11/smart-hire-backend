import { statusCode } from "../../utils/status.util";
import { CategoryEntity } from "../../database/entities/entity/category.entity";
import { FindOneOptions } from "typeorm";

export async function getOneCategoryService(
  option: FindOneOptions<CategoryEntity>
) {
  const foundCategory = await CategoryEntity.findOne(option).catch((e) => {
    console.error("getOneCategoryService -> CategoryEntity.findOne: ", e);
    return null;
  });

  if (!foundCategory) {
    return Promise.reject({
      message: "Category not found",
      status: statusCode.NOT_FOUND,
    });
  }

  return foundCategory;
}
