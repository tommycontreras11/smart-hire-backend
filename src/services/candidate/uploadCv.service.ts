import { CandidateEntity } from "./../../database/entities/entity/candidate.entity";
import { statusCode } from "./../../utils/status.util";
import { uploadFile } from "./../../utils/upload.util";

export async function uploadCandidateCvService(
  file: Express.Multer.File | undefined,
  candidateUUID: string
) {
  if (!file)
    return Promise.reject({
      message: "No file uploaded",
      status: statusCode.BAD_REQUEST,
    });

  const foundCandidate = await CandidateEntity.findOneBy({
    uuid: candidateUUID,
  }).catch((e) => {
    console.error("uploadCvCandidateService -> CandidateEntity.findOneBy: ", e);
    return null;
  });

  if (!foundCandidate) {
    return Promise.reject({
      message: "Candidate not found",
      status: statusCode.NOT_FOUND,
    });
  }

  foundCandidate.curriculum = await uploadFile<CandidateEntity>(
    foundCandidate,
    file
  );

  await foundCandidate.save().catch((e) => {
    console.error("updateCandidateService -> CandidateEntity.update: ", e);
    return null;
  });

  return "Candidate updated successfully";
}
