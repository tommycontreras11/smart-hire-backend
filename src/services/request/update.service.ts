import { RequestEntity } from "../../database/entities/entity/request.entity";
import { UpdateRequestDTO } from "../../dto/request.dto";
import { statusCode } from "../../utils/status.util";
import { StatusRequestEnum } from "./../../constants";
import { CandidateEntity } from "./../../database/entities/entity/candidate.entity";
import { JobPositionEntity } from "./../../database/entities/entity/job-position.entity";
import { RecruitmentEntity } from "./../../database/entities/entity/recruitment.entity";
import { RequestHistoryEntity } from "./../../database/entities/entity/request-history.entity";

export async function updateRequestService(
  uuid: string,
  {
    candidateUUID,
    jobPositionUUID,
    interviewDate,
    nextStep,
    status,
  }: UpdateRequestDTO
) {
  const foundRequest = await RequestEntity.findOne({
    where: { uuid },
    relations: { candidate: true, jobPosition: true, recruiter: true },
  }).catch((e) => {
    console.error("updateRequestService -> RequestEntity.findOne: ", e);
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

  if (status) {
    if (status == StatusRequestEnum.HIRED && foundCandidate) {
      await RecruitmentEntity.create({
        recruiter: foundRequest.recruiter,
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
      ...(foundRequest.recruiter && { recruiter: foundRequest.recruiter }),
      ...(interviewDate && { interview_date: interviewDate }),
      ...(nextStep && { next_step: nextStep }),
      ...(status && { status }),
    }
  ).catch((e) => {
    console.error("updateRequestService -> RequestEntity.update: ", e);
    return null;
  });

  return "Request updated successfully";
}
