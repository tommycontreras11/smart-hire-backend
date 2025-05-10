import { statusCode } from "../../utils/status.util";
import { CategoryEntity } from "../../database/entities/entity/category.entity";
import { UpdateCategoryDTO } from "../../dto/category.dto";
import { Not } from "typeorm";

export async function updateCategoryService(
  uuid: string,
  { name, status }: UpdateCategoryDTO
) {
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

  if (name) {
    const existingCategory = await CategoryEntity.findOne({
      where: { name, uuid: Not(uuid) },
    }).catch((e) => {
      console.error("updateCategoryService -> CategoryEntity.findOneBy: ", e);
      return null;
    });

    if (existingCategory) {
      return Promise.reject({
        message: "Category already exists",
        status: statusCode.BAD_REQUEST,
      });
    }
  }

  await CategoryEntity.update(
    { uuid },
    { ...(name && { name }), ...(status && { status }) }
  ).catch((e) => {
    console.error("updateCategoryService -> CategoryEntity.update: ", e);
    return null;
  });

  return "Category updated successfully";
}