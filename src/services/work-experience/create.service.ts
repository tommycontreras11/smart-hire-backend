import { InstitutionEntity } from "./../../database/entities/entity/institution.entity";
import { JobSourceEntity } from "./../../database/entities/entity/job-source.entity";
import { WorkExperienceEntity } from "../../database/entities/entity/work-experience.entity";
import { CreateWorkExperienceDTO } from "../../dto/work-experience.dto";
import { statusCode } from "../../utils/status.util";
import { CandidateEntity } from "./../../database/entities/entity/candidate.entity";
import { PositionTypeEntity } from "./../../database/entities/entity/position-type.entity";

export async function createWorkExperienceService({
  positionUUID,
  candidateUUID,
  institutionUUID,
  jobSourceUUID,
  ...payload
}: CreateWorkExperienceDTO) {
  const foundPositionType = await PositionTypeEntity.findOneBy({
    uuid: positionUUID,
  }).catch((e) => {
    console.error(
      "createWorkExperienceService -> PositionTypeEntity.findOneBy: ",
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

  const foundCandidate = await CandidateEntity.findOneBy({
    uuid: candidateUUID,
  }).catch((e) => {
    console.error(
      "createWorkExperienceService -> CandidateEntity.findOneBy: ",
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

  const foundInstitution = await InstitutionEntity.findOneBy({
    uuid: institutionUUID,
  }).catch((e) => {
    console.error(
      "createWorkExperienceService -> InstitutionEntity.findOneBy: ",
      e
    );
    return null;
  });

  if (!foundInstitution) {
    return Promise.reject({
      message: "Institution not found",
      status: statusCode.NOT_FOUND,
    });
  }

  const foundJobSource = await JobSourceEntity.findOneBy({
    uuid: jobSourceUUID,
  }).catch((e) => {
    console.error(
      "createWorkExperienceService -> JobSourceEntity.findOneBy: ",
      e
    );
    return null;
  });

  if (!foundJobSource) {
    return Promise.reject({
      message: "Job source not found",
      status: statusCode.NOT_FOUND,
    });
  }

  await WorkExperienceEntity.create({
    institution: foundInstitution,
    ...(foundJobSource && { jobSource: foundJobSource }),
    position: foundPositionType,
    candidate: foundCandidate,
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
