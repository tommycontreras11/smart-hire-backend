import { DataSource } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { jobSourcesData } from "../data/job-source.data";
import { JobSourceEntity } from "./../../../database/entities/entity/job-source.entity";

export class JobSourceSeeder implements Seeder {
  async run(_factory: Factory, dataSource: DataSource): Promise<void> {
    try {
      const jobSourceRepo = dataSource.getRepository(JobSourceEntity);

      await Promise.all(
        jobSourcesData.map(async (jobSource) => {
          const exists = await jobSourceRepo.findOneBy({
            name: jobSource.name,
          });

          if (exists) return;

          await jobSourceRepo.insert(jobSource);
        })
      );
    } catch (error) {
      console.error("JobSourceSeeder -> run: ", error);
    }
  }
}
