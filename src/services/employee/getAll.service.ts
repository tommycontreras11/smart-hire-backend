import { statusCode } from "../../utils/status.util";
import { EmployeeEntity } from "../../database/entities/entity/employee.entity";
import { FindManyOptions } from "typeorm";

export async function getAllEmployeeService(
  options?: FindManyOptions<EmployeeEntity>
) {
  const employee = await EmployeeEntity.find(options).catch((e) => {
    console.error("getAllEmployeeService -> EmployeeEntity.find: ", e);
    return null;
  });

  if (!employee)
    return Promise.reject({
      message: "No employee found",
      status: statusCode.NOT_FOUND,
    });

  return employee;
}
