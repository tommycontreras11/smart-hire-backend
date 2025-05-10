import { StatusEnum } from "./../../../constants";
import { DepartmentEntity } from "./../../../database/entities/entity/department.entity";

const departments = [
  "Human Resources",
  "Finance",
  "IT",
  "Marketing",
  "Sales",
  "Customer Service",
  "Operations",
  "Legal",
  "Procurement",
  "R&D",
  "Production",
  "Administration",
  "Engineering",
  "Quality Assurance",
  "Security",
  "Training & Development",
  "Executive / Management",
];

export const departmentsData: Partial<DepartmentEntity>[] = departments.map(
  (department) => ({
    name: department,
    status: StatusEnum.ACTIVE,
  })
)