import { DataSource } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { InstitutionEntity } from "../../entities/entity/institution.entity";
import { institutionsData } from "../data/institution.data";

export class InstitutionSeeder implements Seeder {
    async run(_factory: Factory, dataSource: DataSource): Promise<void> {
        const institutionRepo = dataSource.getRepository(InstitutionEntity);
    
        try {
            await Promise.all(institutionsData.map(async (institution) => {
                const exists = await institutionRepo.findOneBy({ name: institution.name });

                if(exists) return

                await institutionRepo.save(institution)
            }))
        } catch (error) {
            console.error('InstitutionSeeder -> run: ', error)
        }
    }
}