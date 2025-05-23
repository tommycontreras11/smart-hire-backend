import { Brackets } from "typeorm";
import { JobPositionEntity } from "../../database/entities/entity/job-position.entity";

interface IJobPositionFilter {
  jobOrSkill?: string | undefined;
  location?: string | undefined;
  contractType?: string | undefined;
}

export async function getAllJobPositionService({
  jobOrSkill,
  location,
  contractType,
}: IJobPositionFilter) {
  let query = JobPositionEntity.createQueryBuilder("job")
    .leftJoinAndSelect("job.country", "country")
    .leftJoinAndSelect("job.language", "language")
    .leftJoinAndSelect("job.recruiter", "recruiter")
    .leftJoinAndSelect("recruiter.institution", "institution")
    .leftJoinAndSelect("job.requests", "requests")
    .leftJoinAndSelect("job.competencies", "competencies");

  if (jobOrSkill) {
    const jobOrSkillParam = `%${jobOrSkill}%`;
    query.andWhere(
      new Brackets((qb) => {
        qb.where("job.name LIKE :jobOrSkill", {
          jobOrSkill: jobOrSkillParam,
        }).orWhere(
          `EXISTS (
              SELECT 1
              FROM job_position_competencies jc
              JOIN competencies c ON c.id = jc.competency_id
              WHERE jc.job_position_id = job.id AND c.name LIKE :jobOrSkill
            )`,
          { jobOrSkill: jobOrSkillParam }
        );
      })
    );
  }

  if (location) {
    query.andWhere("country.name LIKE :location", { location: `%${location}%` });
  }

  if (contractType) {
    query.andWhere("job.contract_type LIKE :contractType", { contractType: `%${contractType}%` });
  }

  const jobPositions = await query.getMany();

  return jobPositions;
}