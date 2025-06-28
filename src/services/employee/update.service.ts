import { Not } from "typeorm";
import { EmployeeEntity } from "../../database/entities/entity/employee.entity";
import { UpdateEmployeeDTO } from "../../dto/employee.dto";
import { statusCode } from "../../utils/status.util";
import { DepartmentEntity } from "../../database/entities/entity/department.entity";
import { hashPassword } from "../../utils/common.util";
import { getFullDate } from "./../../utils/date.util";
import { PositionTypeEntity } from "./../../database/entities/entity/position-type.entity";
import { uploadFile } from "./../../utils/upload.util";

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
  }: UpdateEmployeeDTO,
    file?: Express.Multer.File | undefined
) {
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

  foundEmployee.identification = identification ?? foundEmployee.identification;
  foundEmployee.name = name ?? foundEmployee.name;
  foundEmployee.email = email ?? foundEmployee.email;
  foundEmployee.password = password
    ? hashPassword(password)
    : foundEmployee.password;
  foundEmployee.monthly_salary = monthly_salary
    ? parseFloat(monthly_salary)
    : foundEmployee.monthly_salary;
  
    foundEmployee.entry_date = entry_date
    ? new Date(getFullDate(entry_date))
    : foundEmployee.entry_date;

  foundEmployee.positionType = foundPositionType ?? foundEmployee.positionType;
  foundEmployee.department = foundDepartment ?? foundEmployee.department;
  foundEmployee.status = status ?? foundEmployee.status;

  if(file) foundEmployee.photo = await uploadFile<EmployeeEntity>(foundEmployee, file);

  await foundEmployee.save().catch((e) => {
    console.error("updateEmployeeService -> EmployeeEntity.update: ", e);
    return null;
  });

  return "Employee updated successfully";
}