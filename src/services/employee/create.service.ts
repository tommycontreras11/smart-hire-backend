import { EmployeeEntity } from "../../database/entities/entity/employee.entity";
import { CreateEmployeeDTO } from "../../dto/employee.dto";
import { statusCode } from "../../utils/status.util";
import { DepartmentEntity } from "../../database/entities/entity/department.entity";
import { hashPassword } from "../../utils/common.util";
import { validateProperty } from "../../utils/user.util";
import { PositionTypeEntity } from "./../../database/entities/entity/position-type.entity";
import { getFullDate } from "./../../utils/date.util";

export async function createEmployeeService({
  identification,
  email,
  password,
  monthly_salary,
  entry_date,
  departmentUUID,
  positionTypeUUID,
  ...payload
}: CreateEmployeeDTO) {
  await validateProperty<EmployeeEntity>(
    EmployeeEntity,
    identification,
    "Identification"
  );

  await validateProperty<EmployeeEntity>(EmployeeEntity, email, "Email");

  const foundPositionType = await PositionTypeEntity.findOneBy({
    uuid: positionTypeUUID,
  }).catch((e) => {
    console.error("createEmployeeService -> PositionTypeEntity.findOneBy: ", e);
    return null;
  });

  if (!foundPositionType) {
    return Promise.reject({
      message: "Position type not found",
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
    email,
    password: hashPassword(password),
    monthly_salary: parseFloat(monthly_salary),
    entry_date: getFullDate(new Date(entry_date)),
    positionType: foundPositionType,
    department: foundDepartment,
    ...payload,
  })
    .save()
    .catch((e) => {
      console.error("createEmployeeService -> EmployeeEntity.create: ", e);
      return null;
    });

  return "Employee created successfully";
}
