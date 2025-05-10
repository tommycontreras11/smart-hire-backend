import { statusCode } from "../../utils/status.util";
import { DepartmentEntity } from "../../database/entities/entity/department.entity";
import { UpdateDepartmentDTO } from "../../dto/department.dto";
import { Not } from "typeorm";

export async function updateDepartmentService(
  uuid: string,
  { name, status }: UpdateDepartmentDTO
) {
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

  if (name) {
    const existingDepartment = await DepartmentEntity.findOne({
      where: { name, uuid: Not(uuid) },
    }).catch((e) => {
      console.error("updateDepartmentService -> DepartmentEntity.findOneBy: ", e);
      return null;
    });

    if (existingDepartment) {
      return Promise.reject({
        message: "Department already exists",
        status: statusCode.BAD_REQUEST,
      });
    }
  }

  await DepartmentEntity.update(
    { uuid },
    { ...(name && { name }), ...(status && { status }) }
  ).catch((e) => {
    console.error("updateDepartmentService -> DepartmentEntity.update: ", e);
    return null;
  });

  return "Department updated successfully";
}