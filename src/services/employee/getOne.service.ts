import { statusCode } from "../../utils/status.util";
import { EmployeeEntity } from "../../database/entities/entity/employee.entity";
import { FindOneOptions } from "typeorm";

export async function getOneEmployeeService(
  option: FindOneOptions<EmployeeEntity>
) {
  const foundEmployee = await EmployeeEntity.findOne(option).catch((e) => {
    console.error("getOneEmployeeService -> EmployeeEntity.findOne: ", e);
    return null;
  });

  if (!foundEmployee) {
    return Promise.reject({
      message: "Employee not found",
      status: statusCode.NOT_FOUND,
    });
  }

  return foundEmployee;
}
