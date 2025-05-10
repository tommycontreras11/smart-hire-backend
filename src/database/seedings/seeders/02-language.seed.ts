import { DataSource } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { LanguageEntity } from "../../entities/entity/language.entity";
import { languagesData } from "../data/language.data";

export class LanguageSeeder implements Seeder {
    async run(_factory: Factory, dataSource: DataSource): Promise<void> {
        const languageRepo = dataSource.getRepository(LanguageEntity);
    
        try {
            await Promise.all(languagesData.map(async (language) => {
                const exists = await languageRepo.findOneBy({ name: language.name });

                if(exists) return

                await languageRepo.save(language)
            }))
        } catch (error) {
            console.error('LanguageSeeder -> run: ', error)
        }
    }
}