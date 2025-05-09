import { CategoryEntity } from "../../database/entities/entity/category.entity";
import { CreateCategoryDTO } from "../../dto/category.dto";
import { statusCode } from "../../utils/status.util";

export async function createCategoryService({ name }: CreateCategoryDTO) {
  const foundCategory = await CategoryEntity.findOneBy({ name }).catch((e) => {
    console.error("createCategoryService -> CategoryEntity.findOneBy: ", e);
    return null;
  });

  if (foundCategory) {
    return Promise.reject({
      message: "Category already exists",
      status: statusCode.BAD_REQUEST,
    });
  }

  await CategoryEntity.create({
    name,
  })
    .save()
    .catch((e) => {
      console.error("createCategoryService -> CategoryEntity.create: ", e);
      return null;
    });

  return "Category created successfully";
}
