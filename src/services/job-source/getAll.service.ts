import { statusCode } from "../../utils/status.util";
import { JobSourceEntity } from "../../database/entities/entity/job-source.entity";
import { FindManyOptions } from "typeorm";

export async function getAllJobSourceService(
  options?: FindManyOptions<JobSourceEntity>
) {
  const categories = await JobSourceEntity.find(options).catch((e) => {
    console.error("getAllJobSourceService -> JobSourceEntity.find: ", e);
    return null;
  });

  if (!categories)
    return Promise.reject({
      message: "No job sources found",
      status: statusCode.NOT_FOUND,
    });

  return categories;
}