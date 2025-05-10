import { DepartmentEntity } from "../../database/entities/entity/department.entity";
import { CreateDepartmentDTO } from "../../dto/department.dto";
import { statusCode } from "../../utils/status.util";

export async function createDepartmentService({ name }: CreateDepartmentDTO) {
  const foundDepartment = await DepartmentEntity.findOneBy({ name }).catch((e) => {
    console.error("createDepartmentService -> DepartmentEntity.findOneBy: ", e);
    return null;
  });

  if (foundDepartment) {
    return Promise.reject({
      message: "Department already exists",
      status: statusCode.BAD_REQUEST,
    });
  }

  await DepartmentEntity.create({
    name,
  })
    .save()
    .catch((e) => {
      console.error("createDepartmentService -> DepartmentEntity.create: ", e);
      return null;
    });

  return "Department created successfully";
}
