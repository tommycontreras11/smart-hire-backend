import { RecruiterEntity } from "../../database/entities/entity/recruiter.entity";
import { statusCode } from "../../utils/status.util";

export async function deleteRecruiterService(uuid: string) {
  const foundRecruiter = await RecruiterEntity.findOneBy({ uuid }).catch((e) => {
    console.error("updateRecruiterService -> RecruiterEntity.findOneBy: ", e);
    return null;
  });

  if (!foundRecruiter) {
    return Promise.reject({
      message: "Recruiter not found",
      status: statusCode.NOT_FOUND,
    });
  }

  await foundRecruiter.softRemove().catch((e) => {
    console.error("updateRecruiterService -> RecruiterEntity.update: ", e);
    return null;
  });

  return "Recruiter deleted successfully";
}
