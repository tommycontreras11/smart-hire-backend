import { statusCode } from "../../utils/status.util";
import { JobPositionEntity } from "../../database/entities/entity/job-position.entity";
import { FindOneOptions } from "typeorm";

export async function getOneJobPositionService(
  option: FindOneOptions<JobPositionEntity>
) {
  const foundJobPosition = await JobPositionEntity.findOne(option).catch((e) => {
    console.error("getOneJobPositionService -> JobPositionEntity.findOne: ", e);
    return null;
  });

  if (!foundJobPosition) {
    return Promise.reject({
      message: "Job position not found",
      status: statusCode.NOT_FOUND,
    });
  }

  return foundJobPosition;
}