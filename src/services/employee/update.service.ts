import { Not } from "typeorm";
import { EmployeeEntity } from "../../database/entities/entity/employee.entity";
import { UpdateEmployeeDTO } from "../../dto/employee.dto";
import { statusCode } from "../../utils/status.util";
import { DepartmentEntity } from "../../database/entities/entity/department.entity";
import { JobPositionEntity } from "../../database/entities/entity/job-position.entity";
import { hashPassword } from "../../utils/common.util";
import { getFullDate } from "./../../utils/date.util";

export async function updateEmployeeService(
  uuid: string,
  {
    identification,
    name,
    password,
    monthly_salary,
    entry_date,
    jobPositionUUID,
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

  let foundJobPosition: JobPositionEntity | null = null;
  if (jobPositionUUID) {
    foundJobPosition = await JobPositionEntity.findOneBy({
      uuid: jobPositionUUID,
    }).catch((e) => {
      console.error(
        "updateEmployeeService -> JobPositionEntity.findOneBy: ",
        e
      );
      return null;
    });

    if (!foundJobPosition) {
      return Promise.reject({
        message: "Job position not found",
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
    ...(password && { password: hashPassword(password) }),
    ...(monthly_salary && { monthly_salary: parseFloat(monthly_salary) }),
    ...(entry_date && { entry_date: getFullDate(new Date(entry_date)) }),
    ...(foundJobPosition && { jobPosition: foundJobPosition }),
    ...(foundDepartment && { department: foundDepartment }),
    ...(status && { status }),
  }).catch((e) => {
    console.error("updateEmployeeService -> EmployeeEntity.update: ", e);
    return null;
  });

  return "Employee updated successfully";
}