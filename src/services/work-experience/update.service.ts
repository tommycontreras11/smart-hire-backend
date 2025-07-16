import { PositionTypeEntity } from "./../../database/entities/entity/position-type.entity";
import { WorkExperienceEntity } from "../../database/entities/entity/work-experience.entity";
import {
  CreateWorkExperienceDTO,
  UpdateWorkExperienceDTO,
} from "../../dto/work-experience.dto";
import { statusCode } from "../../utils/status.util";
import { CandidateEntity } from "./../../database/entities/entity/candidate.entity";
import { InstitutionEntity } from "./../../database/entities/entity/institution.entity";
import { JobSourceEntity } from "./../../database/entities/entity/job-source.entity";

export async function updateWorkExperienceService(
  uuid: string,
  {
    description,
    date_from,
    date_to,
    location,
    work_type,
    work_location,
    current_position,
    positionUUID,
    candidateUUID,
    institutionUUID,
    jobSourceUUID,
  }: CreateWorkExperienceDTO
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

  let foundInstitution: InstitutionEntity | null = null;
  if (candidateUUID) {
    foundInstitution = await InstitutionEntity.findOneBy({
      uuid: institutionUUID,
    }).catch((e) => {
      console.error(
        "updateWorkExperienceService -> InstitutionEntity.findOneBy: ",
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
  }

  let foundJobSource: JobSourceEntity | null = null;
  if (candidateUUID) {
    foundJobSource = await JobSourceEntity.findOneBy({
      uuid: jobSourceUUID,
    }).catch((e) => {
      console.error(
        "updateWorkExperienceService -> JobSourceEntity.findOneBy: ",
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
  }

  foundWorkExperience.description = description ?? foundWorkExperience.description;
  foundWorkExperience.date_from = date_from ?? foundWorkExperience.date_from;
  foundWorkExperience.date_to = date_to ?? foundWorkExperience.date_to;
  foundWorkExperience.location = location ?? foundWorkExperience.location;
  foundWorkExperience.work_type = work_type ?? foundWorkExperience.work_type;
  foundWorkExperience.work_location = work_location ?? foundWorkExperience.work_location;
  foundWorkExperience.current_position = current_position ?? foundWorkExperience.current_position;
  foundWorkExperience.position = foundPositionType ?? foundWorkExperience.position;
  foundWorkExperience.candidate = foundCandidate ?? foundWorkExperience.candidate;
  foundWorkExperience.institution = foundInstitution ?? foundWorkExperience.institution;
  foundWorkExperience.jobSource = foundJobSource ?? foundWorkExperience.jobSource;

  await foundWorkExperience.save().catch((e) => {
    console.error(
      "updateWorkExperienceService -> WorkExperienceEntity.update: ",
      e
    );
    return null;
  });

  return foundWorkExperience;
}
