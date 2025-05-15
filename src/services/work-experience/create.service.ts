import { CandidateEntity } from "./../../database/entities/entity/candidate.entity";
import { WorkExperienceEntity } from "../../database/entities/entity/work-experience.entity";
import { CreateWorkExperienceDTO } from "../../dto/work-experience.dto";
import { statusCode } from "../../utils/status.util";
import { PositionTypeEntity } from "./../../database/entities/entity/position-type.entity";

export async function createWorkExperienceService({
  company,
  salary,
  positionUUID,
  candidateUUID,
  recommendBy,
  ...payload
}: CreateWorkExperienceDTO) {
  const foundPositionType = await PositionTypeEntity.findOneBy({
    uuid: positionUUID,
  }).catch((e) => {
    console.error("createWorkExperienceService -> PositionTypeEntity.findOneBy: ", e);
    return null;
  });

  if (!foundPositionType) {
    return Promise.reject({
      message: "Job position not found",
      status: statusCode.NOT_FOUND,
    });
  }

  const foundCandidate = await CandidateEntity.findOneBy({
    uuid: candidateUUID,
  }).catch((e) => {
    console.error("createWorkExperienceService -> CandidateEntity.findOneBy: ", e);
    return null;
  });

  if (!foundCandidate) {
    return Promise.reject({
      message: "Candidate not found",
      status: statusCode.NOT_FOUND,
    });
  }

  await WorkExperienceEntity.create({
    company,
    salary: parseFloat(salary),
    position: foundPositionType,
    candidate: foundCandidate,
    ...(recommendBy && { recommend_by: recommendBy }),
    ...payload,
  })
    .save()
    .catch((e) => {
      console.error(
        "createWorkExperienceService -> WorkExperienceEntity.create: ",
        e
      );
      return null;
    });

  return "Work experience created successfully";
}