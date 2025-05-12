import { statusCode } from "../../utils/status.util";
import { CandidateEntity } from "../../database/entities/entity/candidate.entity";
import { FindOneOptions } from "typeorm";

export async function getOneCandidateService(
  option: FindOneOptions<CandidateEntity>
) {
  const foundCandidate = await CandidateEntity.findOne(option).catch((e) => {
    console.error("getOneCandidateService -> CandidateEntity.findOne: ", e);
    return null;
  });

  if (!foundCandidate) {
    return Promise.reject({
      message: "Candidate not found",
      status: statusCode.NOT_FOUND,
    });
  }

  return foundCandidate;
}
