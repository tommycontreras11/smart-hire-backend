import { JobPositionEntity } from "../../database/entities/entity/job-position.entity";
import { statusCode } from "../../utils/status.util";

export async function deleteJobPositionService(uuid: string) {
  const foundJobPosition = await JobPositionEntity.findOneBy({ uuid }).catch((e) => {
    console.error("updateJobPositionService -> JobPositionEntity.findOneBy: ", e);
    return null;
  });

  if (!foundJobPosition) {
    return Promise.reject({
      message: "Job position not found",
      status: statusCode.NOT_FOUND,
    });
  }

  await foundJobPosition.softRemove().catch((e) => {
    console.error("updateJobPositionService -> JobPositionEntity.update: ", e);
    return null;
  });

  return "Job position deleted successfully";
}