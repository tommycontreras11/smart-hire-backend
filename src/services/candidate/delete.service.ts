import { CandidateEntity } from "../../database/entities/entity/candidate.entity";
import { statusCode } from "../../utils/status.util";

export async function deleteCandidateService(uuid: string) {
  const foundCandidate = await CandidateEntity.findOneBy({ uuid }).catch((e) => {
    console.error("updateCandidateService -> CandidateEntity.findOneBy: ", e);
    return null;
  });

  if (!foundCandidate) {
    return Promise.reject({
      message: "Candidate not found",
      status: statusCode.NOT_FOUND,
    });
  }

  await foundCandidate.softRemove().catch((e) => {
    console.error("updateCandidateService -> CandidateEntity.update: ", e);
    return null;
  });

  return "Candidate deleted successfully";
}
