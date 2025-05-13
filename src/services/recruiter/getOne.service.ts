import { statusCode } from "../../utils/status.util";
import { RecruiterEntity } from "../../database/entities/entity/recruiter.entity";
import { FindOneOptions } from "typeorm";

export async function getOneRecruiterService(
  option: FindOneOptions<RecruiterEntity>
) {
  const foundRecruiter = await RecruiterEntity.findOne(option).catch((e) => {
    console.error("getOneRecruiterService -> RecruiterEntity.findOne: ", e);
    return null;
  });

  if (!foundRecruiter) {
    return Promise.reject({
      message: "Recruiter not found",
      status: statusCode.NOT_FOUND,
    });
  }

  return foundRecruiter;
}
