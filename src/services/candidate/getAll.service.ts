import { statusCode } from "../../utils/status.util";
import { CandidateEntity } from "../../database/entities/entity/candidate.entity";
import { FindManyOptions } from "typeorm";

export async function getAllCandidateService(
  options?: FindManyOptions<CandidateEntity>
) {
  const candidate = await CandidateEntity.find(options).catch((e) => {
    console.error("getAllCandidateService -> CandidateEntity.find: ", e);
    return null;
  });

  if (!candidate)
    return Promise.reject({
      message: "No candidate found",
      status: statusCode.NOT_FOUND,
    });

  return candidate;
}
