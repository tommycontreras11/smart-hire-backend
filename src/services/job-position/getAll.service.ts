import { statusCode } from "../../utils/status.util";
import { JobPositionEntity } from "../../database/entities/entity/job-position.entity";
import { FindManyOptions } from "typeorm";

export async function getAllJobPositionService(
  options?: FindManyOptions<JobPositionEntity>
) {
  const jobPositions = await JobPositionEntity.find(options).catch((e) => {
    console.error("getAllJobPositionService -> JobPositionEntity.find: ", e);
    return null;
  });

  if (!jobPositions)
    return Promise.reject({
      message: "No Job positions found",
      status: statusCode.NOT_FOUND,
    });

  return jobPositions;
}