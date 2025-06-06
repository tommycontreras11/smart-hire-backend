import { StatusEnum } from "./../../../constants";
import { DepartmentEntity } from "./../../../database/entities/entity/department.entity";

const departments = [
  "Finance",
  "IT",
  "Marketing",
  "Operations",
  "Quality Assurance",
];

export const departmentsData: Partial<DepartmentEntity>[] = departments.map(
  (department) => ({
    name: department,
    status: StatusEnum.ACTIVE,
  })
)