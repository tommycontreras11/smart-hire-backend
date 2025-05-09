import { DataSource } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { EvaluationMethodEntity } from "../../entities/entity/evaluation-method.entity";
import { evaluationMethodsData } from "../data/evaluation-method.data";

export class EvaluationMethodSeeder implements Seeder {
    async run(_factory: Factory, dataSource: DataSource): Promise<void> {
        const evaluationMethodRepo = dataSource.getRepository(EvaluationMethodEntity);
    
        try {
            await Promise.all(evaluationMethodsData.map(async (evaluationMethod) => {
                const exists = await evaluationMethodRepo.findOneBy({ name: evaluationMethod.name });

                if(exists) return

                await evaluationMethodRepo.save(evaluationMethod)
            }))
        } catch (error) {
            console.error('EvaluationMethodSeeder -> run: ', error)
        }
    }
}