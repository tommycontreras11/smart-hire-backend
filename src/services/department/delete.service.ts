import { DepartmentEntity } from "../../database/entities/entity/department.entity";
import { statusCode } from "../../utils/status.util";

export async function deleteDepartmentService(uuid: string) {
  const foundDepartment = await DepartmentEntity.findOneBy({ uuid }).catch((e) => {
    console.error("updateDepartmentService -> DepartmentEntity.findOneBy: ", e);
    return null;
  });

  if (!foundDepartment) {
    return Promise.reject({
      message: "Department not found",
      status: statusCode.NOT_FOUND,
    });
  }

  await foundDepartment.softRemove().catch((e) => {
    console.error("updateDepartmentService -> DepartmentEntity.update: ", e);
    return null;
  });

  return "Department deleted successfully";
}
