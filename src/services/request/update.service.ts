import { RecruitmentEntity } from "./../../database/entities/entity/recruitment.entity";
import { RequestEntity } from "../../database/entities/entity/request.entity";
import { UpdateRequestDTO } from "../../dto/request.dto";
import { statusCode } from "../../utils/status.util";
import { StatusRequestEnum } from "./../../constants";
import { CandidateEntity } from "./../../database/entities/entity/candidate.entity";
import { JobPositionEntity } from "./../../database/entities/entity/job-position.entity";
import { RecruiterEntity } from "./../../database/entities/entity/recruiter.entity";
import { RequestHistoryEntity } from "./../../database/entities/entity/request-history.entity";

export async function updateRequestService(
  uuid: string,
  { candidateUUID, jobPositionUUID, recruiterUUID, status }: UpdateRequestDTO
) {
  const foundRequest = await RequestEntity.findOneBy({ uuid }).catch((e) => {
    console.error("updateRequestService -> RequestEntity.findOneBy: ", e);
    return null;
  });

  if (!foundRequest) {
    return Promise.reject({
      message: "Request not found",
      status: statusCode.NOT_FOUND,
    });
  }

  let foundCandidate: CandidateEntity | null = null;
  if (candidateUUID) {
    foundCandidate = await CandidateEntity.findOneBy({
      uuid: candidateUUID,
    }).catch((e) => {
      console.error("updateRequestService -> CandidateEntity.findOneBy: ", e);
      return null;
    });

    if (!foundCandidate) {
      return Promise.reject({
        message: "Candidate not found",
        status: statusCode.NOT_FOUND,
      });
    }
  }
  let foundJobPosition: JobPositionEntity | null = null;
  if (jobPositionUUID) {
    foundJobPosition = await JobPositionEntity.findOneBy({
      uuid: jobPositionUUID,
    }).catch((e) => {
      console.error("updateRequestService -> JobPositionEntity.findOneBy: ", e);
      return null;
    });

    if (!foundJobPosition) {
      return Promise.reject({
        message: "Job position not found",
        status: statusCode.NOT_FOUND,
      });
    }
  }
  let foundRecruiter: RecruiterEntity | null = null;
  if (recruiterUUID) {
    foundRecruiter = await RecruiterEntity.findOneBy({
      uuid: recruiterUUID,
    }).catch((e) => {
      console.error("updateRequestService -> RecruiterEntity.findOneBy: ", e);
      return null;
    });

    if (!foundRecruiter) {
      return Promise.reject({
        message: "Recruiter not found",
        status: statusCode.NOT_FOUND,
      });
    }
  }

  if (status) {
    if (status == StatusRequestEnum.HIRED && foundCandidate && foundRecruiter) {
      await RecruitmentEntity.create({
        recruiter: foundRecruiter,
        candidate: foundCandidate,
      })
        .save()
        .catch((e) => {
          console.error(
            "updateRequestService -> RecruitmentEntity.create: ",
            e
          );
          return null;
        });
    }

    await RequestHistoryEntity.create({
      request: foundRequest,
      status,
    })
      .save()
      .catch((e) => {
        console.error(
          "updateRequestService -> RequestHistoryEntity.create: ",
          e
        );
        return null;
      });
  }

  await RequestEntity.update(
    { uuid },
    {
      ...(foundCandidate && { candidate: foundCandidate }),
      ...(foundJobPosition && { jobPosition: foundJobPosition }),
      ...(foundRecruiter && { recruiter: foundRecruiter }),
      ...(status && { status }),
    }
  ).catch((e) => {
    console.error("updateRequestService -> RequestEntity.update: ", e);
    return null;
  });

  return "Request updated successfully";
}
