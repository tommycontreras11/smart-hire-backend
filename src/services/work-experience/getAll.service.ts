import { statusCode } from "../../utils/status.util";
import { WorkExperienceEntity } from "../../database/entities/entity/work-experience.entity";
import { FindManyOptions } from "typeorm";

export async function getAllWorkExperienceService(
  options?: FindManyOptions<WorkExperienceEntity>
) {
  const jobPositions = await WorkExperienceEntity.find(options).catch((e) => {
    console.error("getAllWorkExperienceService -> WorkExperienceEntity.find: ", e);
    return null;
  });

  if (!jobPositions)
    return Promise.reject({
      message: "No Job positions found",
      status: statusCode.NOT_FOUND,
    });

  return jobPositions;
}