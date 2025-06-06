import { DepartmentEntity } from "./../../database/entities/entity/department.entity";
import { PositionTypeEntity } from "../../database/entities/entity/position-type.entity";
import { CreatePositionTypeDTO } from "../../dto/position-type.dto";
import { statusCode } from "../../utils/status.util";

export async function createPositionTypeService({
  name,
  departmentUUID,
}: CreatePositionTypeDTO) {
  const foundPositionType = await PositionTypeEntity.findOneBy({ name }).catch(
    (e) => {
      console.error(
        "createPositionTypeService -> PositionTypeEntity.findOneBy: ",
        e
      );
      return null;
    }
  );

  if (foundPositionType) {
    return Promise.reject({
      message: "Position type already exists",
      status: statusCode.BAD_REQUEST,
    });
  }

  const foundDepartment = await DepartmentEntity.findOneBy({
    uuid: departmentUUID,
  }).catch((e) => {
    console.error(
      "createPositionTypeService -> DepartmentEntity.findOneBy: ",
      e
    );
    return null;
  });

  if (!foundDepartment) {
    return Promise.reject({
      message: "Department not found",
      status: statusCode.NOT_FOUND,
    });
  }

  await PositionTypeEntity.create({
    name,
    department: foundDepartment,
  })
    .save()
    .catch((e) => {
      console.error(
        "createPositionTypeService -> PositionTypeEntity.create: ",
        e
      );
      return null;
    });

  return "Position type created successfully";
}
