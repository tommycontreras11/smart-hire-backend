import { statusCode } from "../../utils/status.util";
import { DepartmentEntity } from "../../database/entities/entity/department.entity";
import { FindOneOptions } from "typeorm";

export async function getOneDepartmentService(
  option: FindOneOptions<DepartmentEntity>
) {
  const foundDepartment = await DepartmentEntity.findOne(option).catch((e) => {
    console.error("getOneDepartmentService -> DepartmentEntity.findOne: ", e);
    return null;
  });

  if (!foundDepartment) {
    return Promise.reject({
      message: "Department not found",
      status: statusCode.NOT_FOUND,
    });
  }

  return foundDepartment;
}
