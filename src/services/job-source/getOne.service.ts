import { statusCode } from "../../utils/status.util";
import { JobSourceEntity } from "../../database/entities/entity/job-source.entity";
import { FindOneOptions } from "typeorm";

export async function getOneJobSourceService(
  option: FindOneOptions<JobSourceEntity>
) {
  const foundJobSource = await JobSourceEntity.findOne(option).catch((e) => {
    console.error("getOneJobSourceService -> JobSourceEntity.findOne: ", e);
    return null;
  });

  if (!foundJobSource) {
    return Promise.reject({
      message: "Job source not found",
      status: statusCode.NOT_FOUND,
    });
  }

  return foundJobSource;
}