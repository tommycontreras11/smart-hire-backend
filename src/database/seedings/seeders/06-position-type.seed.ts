import { DataSource } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { PositionTypeEntity } from "../../entities/entity/position-type.entity";
import { positionTypesData } from "../data/position-type.data";
import { DepartmentEntity } from "../../entities/entity/department.entity";

export class PositionTypeSeeder implements Seeder {
  async run(_factory: Factory, dataSource: DataSource): Promise<void> {
    const positionTypeRepo = dataSource.getRepository(PositionTypeEntity);
    const departmentRepo = dataSource.getRepository(DepartmentEntity);

    try {
      await Promise.all(
        positionTypesData.map(async (positionType) => {
          const exists = await positionTypeRepo.findOneBy({
            name: positionType.name,
          });

          if (exists) return;

          const foundDepartment = await departmentRepo.findOneBy({
            name: positionType.department,
          });

          if (!foundDepartment) return;

          await positionTypeRepo.save({
            name: positionType.name,
            department: foundDepartment,
            status: positionType.status,
          });
        })
      );
    } catch (error) {
      console.error("PositionTypeSeeder -> run: ", error);
    }
  }
}
