import { DataSource } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { CountryEntity } from "./../../../database/entities/entity/country.entity";
import { countryData } from "../data/country.data";

export class CountrySeeder implements Seeder {
    async run(_factory: Factory, dataSource: DataSource): Promise<void> {
        const countryRepo = dataSource.getRepository(CountryEntity);
    
        try {
            await Promise.all(countryData.map(async (country) => {
                const exists = await countryRepo.findOneBy({ name: country.name });

                if(exists) return

                await countryRepo.save(country)
            }))
        } catch (error) {
            console.error('CountrySeeder -> run: ', error)
        }
    }
}