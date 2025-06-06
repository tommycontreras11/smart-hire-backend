import { DataSource } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { DepartmentEntity } from "../../entities/entity/department.entity";
import { departmentsData } from "../data/department.data";

export class DepartmentSeeder implements Seeder {
    async run(_factory: Factory, dataSource: DataSource): Promise<void> {
        const departmentRepo = dataSource.getRepository(DepartmentEntity);
    
        try {
            await Promise.all(departmentsData.map(async (department) => {
                const exists = await departmentRepo.findOneBy({ name: department.name });

                if(exists) return

                await departmentRepo.save(department)
            }))
        } catch (error) {
            console.error('DepartmentSeeder -> run: ', error)
        }
    }
}