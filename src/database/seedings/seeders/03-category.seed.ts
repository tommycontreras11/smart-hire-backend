import { DataSource } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { CategoryEntity } from "../../entities/entity/category.entity";
import { categoriesData } from "../data/category.data";

export class CategorySeeder implements Seeder {
    async run(_factory: Factory, dataSource: DataSource): Promise<void> {
        const categoryRepo = dataSource.getRepository(CategoryEntity);
    
        try {
            await Promise.all(categoriesData.map(async (category) => {
                const exists = await categoryRepo.findOneBy({ name: category.name });

                if(exists) return

                await categoryRepo.save(category)
            }))
        } catch (error) {
            console.error('CategorySeeder -> run: ', error)
        }
    }
}