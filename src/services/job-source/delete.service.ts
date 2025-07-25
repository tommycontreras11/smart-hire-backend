import { JobSourceEntity } from "../../database/entities/entity/job-source.entity";
import { statusCode } from "../../utils/status.util";

export async function deleteJobSourceService(uuid: string) {
  const foundJobSource = await JobSourceEntity.findOneBy({ uuid }).catch((e) => {
    console.error("updateJobSourceService -> JobSourceEntity.findOneBy: ", e);
    return null;
  });

  if (!foundJobSource) {
    return Promise.reject({
      message: "Job source not found",
      status: statusCode.NOT_FOUND,
    });
  }

  await foundJobSource.softRemove().catch((e) => {
    console.error("updateJobSourceService -> JobSourceEntity.update: ", e);
    return null;
  });

  return "Job source deleted successfully";
}
