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
    nextStatus,
    status,
  }: Partial<UpdateRequestDTO>
) {
  const foundRequest = await RequestEntity.findOne({
    where: { uuid },
    relations: { candidate: true, jobPosition: true, recruiter: true },
  }).catch((e) => {
    console.error("updateRequestService -> RequestEntity.findOne: ", e);
    return null;
  });

  const statuses = [
    StatusRequestEnum.DRAFT,
    StatusRequestEnum.SUBMITTED,
    StatusRequestEnum.UNDER_REVIEW,
    StatusRequestEnum.INTERVIEW,
    StatusRequestEnum.EVALUATED
  ];

  const indexOf = statuses.findIndex((a) => a === status);

  if (nextStatus && indexOf > -1) {
    const index =
      status === StatusRequestEnum.REJECTED ? indexOf - 1 : indexOf + 1;
    status = statuses[index];
  }

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
    if (
      [StatusRequestEnum.HIRED, StatusRequestEnum.REJECTED].includes(
        status as StatusRequestEnum
      ) &&
      foundCandidate
    ) {
      await changeStatus(
        status as StatusRequestEnum,
        foundRequest,
        foundCandidate
      );
    }

    const existingHistory = await RequestHistoryEntity.findOne({
      relations: {
        request: true,
      },
      where: {
        request: {
          id: foundRequest.id
        },
        status,
      },
    });

    if (!existingHistory) {
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

export const changeStatus = async (
  status: StatusRequestEnum,
  foundRequest: RequestEntity,
  foundCandidate: CandidateEntity
) => {
  switch (status) {
    case StatusRequestEnum.HIRED:
      await RecruitmentEntity.create({
        recruiter: foundRequest.recruiter,
        candidate: foundCandidate,
        request: foundRequest,
      })
        .save()
        .catch((e) => {
          console.error(
            "updateRequestService -> RecruitmentEntity.create: ",
            e
          );
          return null;
        });
      break;
    case StatusRequestEnum.REJECTED:
      const foundRecruitment = await RecruitmentEntity.findOne({
        where: { request: foundRequest },
      }).catch((e) => {
        console.error("updateRequestService -> RecruitmentEntity.findOne: ", e);
        return null;
      });

      foundRecruitment &&
        (await foundRecruitment.remove().catch((e) => {
          console.error(
            "updateRequestService -> RecruitmentEntity.remove: ",
            e
          );
          return null;
        }));
      break;
  }
};
