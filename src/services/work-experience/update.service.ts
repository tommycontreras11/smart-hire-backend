import { PositionTypeEntity } from "./../../database/entities/entity/position-type.entity";
import { WorkExperienceEntity } from "../../database/entities/entity/work-experience.entity";
import { UpdateWorkExperienceDTO } from "../../dto/work-experience.dto";
import { statusCode } from "../../utils/status.util";
import { CandidateEntity } from "./../../database/entities/entity/candidate.entity";

export async function updateWorkExperienceService(
  uuid: string,
  {
    company,
    date_from,
    date_to,
    salary,
    positionUUID,
    candidateUUID,
    recommendBy,
    status,
  }: UpdateWorkExperienceDTO
) {
  const foundWorkExperience = await WorkExperienceEntity.findOneBy({
    uuid,
  }).catch((e) => {
    console.error(
      "updateWorkExperienceService -> WorkExperienceEntity.findOneBy: ",
      e
    );
    return null;
  });

  if (!foundWorkExperience) {
    return Promise.reject({
      message: "Work experience not found",
      status: statusCode.NOT_FOUND,
    });
  }

  let foundPositionType: PositionTypeEntity | null = null;
  if (positionUUID) {
    foundPositionType = await PositionTypeEntity.findOneBy({
      uuid: positionUUID,
    }).catch((e) => {
      console.error(
        "updateWorkExperienceService -> PositionTypeEntity.findOneBy: ",
        e
      );
      return null;
    });

    if (!foundPositionType) {
      return Promise.reject({
        message: "Job position not found",
        status: statusCode.NOT_FOUND,
      });
    }
  }

  let foundCandidate: CandidateEntity | null = null;
  if (candidateUUID) {
    foundCandidate = await CandidateEntity.findOneBy({
      uuid: candidateUUID,
    }).catch((e) => {
      console.error(
        "updateWorkExperienceService -> CandidateEntity.findOneBy: ",
        e
      );
      return null;
    });

    if (!foundCandidate) {
      return Promise.reject({
        message: "Candidate not found",
        status: statusCode.NOT_FOUND,
      });
    }
  }

  await WorkExperienceEntity.update(
    { uuid },
    {
      ...(company && { company }),
      ...(salary && { salary: parseFloat(salary) }),
      ...(date_from && { date_from }),
      ...(date_to && { date_to }),
      ...(foundPositionType && { position: foundPositionType }),
      ...(foundCandidate && { candidate: foundCandidate }),
      ...(recommendBy && { recommend_by: recommendBy }),
      ...(status && { status }),
    }
  ).catch((e) => {
    console.error(
      "updateWorkExperienceService -> WorkExperienceEntity.update: ",
      e
    );
    return null;
  });

  return foundWorkExperience;
}
