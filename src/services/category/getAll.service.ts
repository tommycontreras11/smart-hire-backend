import { statusCode } from "../../utils/status.util";
import { CategoryEntity } from "../../database/entities/entity/category.entity";
import { FindManyOptions } from "typeorm";

export async function getAllCategoryService(
  options?: FindManyOptions<CategoryEntity>
) {
  const countries = await CategoryEntity.find(options).catch((e) => {
    console.error("getAllCategoryService -> CategoryEntity.find: ", e);
    return null;
  });

  if (!countries)
    return Promise.reject({
      message: "No countries found",
      status: statusCode.NOT_FOUND,
    });

  return countries;
}
