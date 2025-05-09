import { StatusEnum } from "./../../../constants";
import { CategoryEntity } from "./../../../database/entities/entity/category.entity";

const categories = ["Soft Skills", "Leadership Skills", "Cognitive Skills"];

export const categoriesData: Partial<CategoryEntity>[] = categories.map(
  (category) => ({
    name: category,
    status: StatusEnum.ACTIVE,
  })
);