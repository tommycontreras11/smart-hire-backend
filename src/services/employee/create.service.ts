import { EmployeeEntity } from "../../database/entities/entity/employee.entity";
import { CreateEmployeeDTO } from "../../dto/employee.dto";
import { statusCode } from "../../utils/status.util";
import { DepartmentEntity } from "../../database/entities/entity/department.entity";
import { JobPositionEntity } from "../../database/entities/entity/job-position.entity";
import { hashPassword } from "../../utils/common.util";
import {
  validateIdentification
} from "../../utils/user.util";

export async function createEmployeeService({
  identification,
  password,
  monthly_salary,
  entry_date,
  departmentUUID,
  jobPositionUUID,
  ...payload
}: CreateEmployeeDTO) {
  // file?: Express.Multer.File | undefined
  await validateIdentification<EmployeeEntity>(
    EmployeeEntity,
    identification
  );

  const foundJobPosition = await JobPositionEntity.findOneBy({
    uuid: jobPositionUUID,
  }).catch((e) => {
    console.error(
      "createEmployeeService -> JobPositionEntity.findOneBy: ",
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

  const foundDepartment = await DepartmentEntity.findOneBy({
    uuid: departmentUUID,
  }).catch((e) => {
    console.error("createEmployeeService -> DepartmentEntity.findOneBy: ", e);
    return null;
  });

  if (!foundDepartment) {
    return Promise.reject({
      message: "Department not found",
      status: statusCode.NOT_FOUND,
    });
  }

  await EmployeeEntity.create({
    identification,
    password: hashPassword(password),
    monthly_salary: parseFloat(monthly_salary),
    jobPosition: foundJobPosition,
    department: foundDepartment,
    file_name: "s",
    ...payload,
  })
    .save()
    .catch((e) => {
      console.error("createEmployeeService -> EmployeeEntity.create: ", e);
      return null;
    });

  return "Employee created successfully";
}
