import { DataSource } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { TrainingEntity, TrainingLevelEnum } from "../../entities/entity/training.entity";
import { trainingData } from "../data/training.data";
import { InstitutionEntity } from "../../entities/entity/institution.entity";

export class TrainingSeeder implements Seeder {
  async run(_factory: Factory, dataSource: DataSource): Promise<void> {
    const trainingRepo = dataSource.getRepository(TrainingEntity);
    const institutionRepo = dataSource.getRepository(InstitutionEntity);

    try {
      await Promise.all(
        trainingData.map(async ({ institution, level, ...training }) => {
          const exists = await trainingRepo.findOneBy({ name: training.name });

          if (exists) return;

          const foundInstitution = await institutionRepo.findOneBy({
            name: institution,
          });

          if (!foundInstitution) return;

          await trainingRepo.save({
            ...training,
            level: level as keyof typeof TrainingLevelEnum,
            institution_id: foundInstitution.id,
          });
        })
      );
    } catch (error) {
      console.error("TrainingSeeder -> run: ", error);
    }
  }
}
