import { CandidateEntity } from "./../../database/entities/entity/candidate.entity";
import { JobPositionEntity } from "./../../database/entities/entity/job-position.entity";
import { RequestEntity } from "../../database/entities/entity/request.entity";
import { CreateRequestDTO } from "../../dto/request.dto";
import { statusCode } from "../../utils/status.util";
import { RecruiterEntity } from "./../../database/entities/entity/recruiter.entity";
import { StatusRequestEnum } from "./../../constants";

export async function createRequestService({ candidateUUID, jobPositionUUID, recruiterUUID }: CreateRequestDTO) {
  const foundCandidate = await CandidateEntity.findOneBy({ uuid: candidateUUID }).catch((e) => {
    console.error("createRequestService -> CandidateEntity.findOneBy: ", e);
    return null;
  });

  if (!foundCandidate) {
    return Promise.reject({
      message: "Candidate not found",
      status: statusCode.NOT_FOUND,
    });
  }

  const foundJobPosition = await JobPositionEntity.findOneBy({ uuid: jobPositionUUID }).catch((e) => {
    console.error("createRequestService -> JobPositionEntity.findOneBy: ", e);
    return null;
  });

  if (!foundJobPosition) {
    return Promise.reject({
      message: "Job position not found",
      status: statusCode.NOT_FOUND,
    });
  }

  const foundRecruiter = await RecruiterEntity.findOneBy({ uuid: recruiterUUID }).catch((e) => {
    console.error("createRequestService -> RecruiterEntity.findOneBy: ", e);
    return null;
  });

  if (!foundRecruiter) {
    return Promise.reject({
      message: "Recruiter not found",
      status: statusCode.NOT_FOUND,
    });
  }

  await RequestEntity.create({
    candidate: foundCandidate,
    jobPosition: foundJobPosition,
    recruiter: foundRecruiter,
    status: StatusRequestEnum.SUBMITTED,
  })
    .save()
    .catch((e) => {
      console.error("createRequestService -> RequestEntity.create: ", e);
      return null;
    });

  return "Request created successfully";
}
