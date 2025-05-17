import { EmployeeEntity } from "../../database/entities/entity/employee.entity";
import { statusCode } from "../../utils/status.util";

export async function deleteEmployeeService(uuid: string) {
  const foundEmployee = await EmployeeEntity.findOneBy({ uuid }).catch((e) => {
    console.error("deleteEmployeeService -> EmployeeEntity.findOneBy: ", e);
    return null;
  });

  if (!foundEmployee) {
    return Promise.reject({
      message: "Employee not found",
      status: statusCode.NOT_FOUND,
    });
  }

  await foundEmployee.softRemove().catch((e) => {
    console.error("deleteEmployeeService -> EmployeeEntity.update: ", e);
    return null;
  });

  return "Employee deleted successfully";
}
