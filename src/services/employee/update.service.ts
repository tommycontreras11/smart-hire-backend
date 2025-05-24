import { Not } from "typeorm";
import { EmployeeEntity } from "../../database/entities/entity/employee.entity";
import { UpdateEmployeeDTO } from "../../dto/employee.dto";
import { statusCode } from "../../utils/status.util";
import { DepartmentEntity } from "../../database/entities/entity/department.entity";
import { hashPassword } from "../../utils/common.util";
import { getFullDate } from "./../../utils/date.util";
import { PositionTypeEntity } from "./../../database/entities/entity/position-type.entity";

export async function updateEmployeeService(
  uuid: string,
  {
    identification,
    name,
    email,
    password,
    monthly_salary,
    entry_date,
    positionTypeUUID,
    departmentUUID,
    status,
  }: UpdateEmployeeDTO
) {
  // file?: Express.Multer.File | undefined
  const foundEmployee = await EmployeeEntity.findOne({
    where: { uuid },
  }).catch((e) => {
    console.error("updateEmployeeService -> EmployeeEntity.findOneBy: ", e);
    return null;
  });

  if (!foundEmployee) {
    return Promise.reject({
      message: "Employee not found",
      status: statusCode.NOT_FOUND,
    });
  }

  if (identification) {
    const existingEmployee = await EmployeeEntity.findOne({
      where: { identification, uuid: Not(uuid) },
    }).catch((e) => {
      console.error("updateEmployeeService -> EmployeeEntity.findOneBy: ", e);
      return null;
    });

    if (existingEmployee) {
      return Promise.reject({
        message: "Employee's identification already exists",
        status: statusCode.BAD_REQUEST,
      });
    }
  }

  let foundPositionType: PositionTypeEntity | null = null;
  if (positionTypeUUID) {
    foundPositionType = await PositionTypeEntity.findOneBy({
      uuid: positionTypeUUID,
    }).catch((e) => {
      console.error(
        "updateEmployeeService -> PositionTypeEntity.findOneBy: ",
        e
      );
      return null;
    });

    if (!foundPositionType) {
      return Promise.reject({
        message: "Position type not found",
        status: statusCode.NOT_FOUND,
      });
    }
  }

  let foundDepartment: DepartmentEntity | null = null;
  if (departmentUUID) {
    foundDepartment = await DepartmentEntity.findOneBy({
      uuid: departmentUUID,
    }).catch((e) => {
      console.error(
        "updateEmployeeService -> DepartmentEntity.findOneBy: ",
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
  }

  EmployeeEntity.update({ uuid }, {
    ...(identification && { identification }),
    ...(name && { name }),
    ...(email && { email }),
    ...(password && { password: hashPassword(password) }),
    ...(monthly_salary && { monthly_salary: parseFloat(monthly_salary) }),
    ...(entry_date && { entry_date: getFullDate(new Date(entry_date)) }),
    ...(foundPositionType && { positionType: foundPositionType }),
    ...(foundDepartment && { department: foundDepartment }),
    ...(status && { status }),
  }).catch((e) => {
    console.error("updateEmployeeService -> EmployeeEntity.update: ", e);
    return null;
  });

  return "Employee updated successfully";
}