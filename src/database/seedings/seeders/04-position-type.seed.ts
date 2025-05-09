import { DataSource } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { PositionTypeEntity } from "../../entities/entity/position-type.entity";
import { positionTypesData } from "../data/position-type.data";

export class PositionTypeSeeder implements Seeder {
    async run(_factory: Factory, dataSource: DataSource): Promise<void> {
        const positionTypeRepo = dataSource.getRepository(PositionTypeEntity);
    
        try {
            await Promise.all(positionTypesData.map(async (positionType) => {
                const exists = await positionTypeRepo.findOneBy({ name: positionType.name });

                if(exists) return

                await positionTypeRepo.save(positionType)
            }))
        } catch (error) {
            console.error('PositionTypeSeeder -> run: ', error)
        }
    }
}