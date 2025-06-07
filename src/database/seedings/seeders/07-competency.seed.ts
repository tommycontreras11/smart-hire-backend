import { DataSource, In } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { CompetencyEntity } from "../../entities/entity/competency.entity";
import { competenciesData } from "../data/competency.data";
import { CategoryEntity } from "../../entities/entity/category.entity";
import { EvaluationMethodEntity } from "../../entities/entity/evaluation-method.entity";
import { PositionTypeEntity } from "../../entities/entity/position-type.entity";

export class CompetencySeeder implements Seeder {
  async run(_factory: Factory, dataSource: DataSource): Promise<void> {
    const competencyRepo = dataSource.getRepository(CompetencyEntity);
    const categoryRepo = dataSource.getRepository(CategoryEntity);
    const evaluationMethodRepo = dataSource.getRepository(
      EvaluationMethodEntity
    );
    const positionTypeRepo = dataSource.getRepository(
      PositionTypeEntity
    );

    try {
      await Promise.all(
        competenciesData.map(async (competency) => {
          const exists = await competencyRepo.findOneBy({
            name: competency.name,
          });

          if (exists) return;

          const foundCategory = await categoryRepo.findOneBy({
            name: competency.category,
          });

          if (!foundCategory) return;

          const foundEvaluationMethods = await evaluationMethodRepo.find({
            where: { name: In(competency.evaluationMethods) },
          });

          if (!foundEvaluationMethods) return;

          const foundPositionTypes = await positionTypeRepo.find({
            where: { name: In(competency.positionTypes) },
          });

          if (!foundPositionTypes) return;

          const competencySaved = await competencyRepo.insert({
            name: competency.name,
            category: foundCategory,
            level: competency.level,
            status: competency.status,
          });

          for(let i = 0; i < foundEvaluationMethods.length; i++) {
            await competencyRepo.createQueryBuilder()
              .relation(CompetencyEntity, "evaluationMethods")
              .of(competencySaved.identifiers[0].id)
              .add(foundEvaluationMethods[i].id);
          }

          for(let i = 0; i < foundPositionTypes.length; i++) {
            await competencyRepo.createQueryBuilder()
              .relation(CompetencyEntity, "positionTypes")
              .of(competencySaved.identifiers[0].id)
              .add(foundPositionTypes[i].id);
          }
        })
      );
    } catch (error) {
      console.error("CompetencySeeder -> run: ", error);
    }
  }
}