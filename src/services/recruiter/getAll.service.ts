import { statusCode } from "../../utils/status.util";
import { RecruiterEntity } from "../../database/entities/entity/recruiter.entity";
import { FindManyOptions } from "typeorm";

export async function getAllRecruiterService(
  options?: FindManyOptions<RecruiterEntity>
) {
  const recruiters = await RecruiterEntity.find(options).catch((e) => {
    console.error("getAllRecruiterService -> RecruiterEntity.find: ", e);
    return null;
  });

  if (!recruiters)
    return Promise.reject({
      message: "No recruiters found",
      status: statusCode.NOT_FOUND,
    });

  return recruiters;
}
