import { statusCode } from "../../utils/status.util";
import { DepartmentEntity } from "../../database/entities/entity/department.entity";
import { FindManyOptions } from "typeorm";

export async function getAllDepartmentService(
  options?: FindManyOptions<DepartmentEntity>
) {
  const departments = await DepartmentEntity.find(options).catch((e) => {
    console.error("getAllDepartmentService -> DepartmentEntity.find: ", e);
    return null;
  });

  if (!departments)
    return Promise.reject({
      message: "No departments found",
      status: statusCode.NOT_FOUND,
    });

  return departments;
}
