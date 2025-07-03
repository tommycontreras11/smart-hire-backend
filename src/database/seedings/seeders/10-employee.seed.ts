import { DataSource } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { EmployeeEntity } from "../../entities/entity/employee.entity";
import { employeesData } from "../data/employee.data";
import { DepartmentEntity } from "../../entities/entity/department.entity";
import { PositionTypeEntity } from "./../../../database/entities/entity/position-type.entity";
const bcrypt = require("bcrypt");

export class EmployeeSeeder implements Seeder {
  async run(_factory: Factory, dataSource: DataSource): Promise<void> {
    const employeeRepo = dataSource.getRepository(EmployeeEntity);
    const departmentRepo = dataSource.getRepository(DepartmentEntity);
    const positionTypeRepo = dataSource.getRepository(PositionTypeEntity);

    try {
      await Promise.all(
        employeesData.map(async (employee) => {
          const exists = await employeeRepo.findOneBy({
            email: employee.email,
          });

          if (exists) return;

          const foundPositionType = await positionTypeRepo.findOneBy({
            name: employee.positionType,
          });

          if (!foundPositionType) return;

          const foundDepartment = await departmentRepo.findOneBy({
            name: employee.department,
          });

          if (!foundDepartment) return;

          await employeeRepo.save({
            identification: employee.identification,
            name: employee.name,
            email: employee.email,
            password: await bcrypt.hash(employee.password, 10),
            monthly_salary: employee.monthly_salary,
            entry_date: employee.entry_date,
            positionType: foundPositionType,
            department: foundDepartment,
            file_name: employee.file_name,
            status: employee.status,
          });
        })
      );
    } catch (error) {
      console.error("EmployeeSeeder -> run: ", error);
    }
  }
}
