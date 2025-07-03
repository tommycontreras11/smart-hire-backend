import { DataSource } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { academicDisciplinesData } from "../data/academic-discipline.data";
import { AcademicDisciplineEntity } from "./../../../database/entities/entity/academic-discipline.entity";

export class AcademicDisciplineSeeder implements Seeder {
  async run(_factory: Factory, dataSource: DataSource): Promise<void> {
    try {
      const academicDisciplineRepository = dataSource.getRepository(AcademicDisciplineEntity);

      await Promise.all(
        academicDisciplinesData.map(async (academicDiscipline) => {
          const exists = await academicDisciplineRepository.findOneBy({
            name: academicDiscipline.name,
          });

          if (exists) return;

          await academicDisciplineRepository.insert(academicDiscipline);
        })
      );
    } catch (error) {
        console.error("AcademicDisciplineSeeder -> run: ", error);
    }
  }
}
