import { In } from "typeorm";
import { WorkExperienceEntity } from "../../database/entities/entity/work-experience.entity";
import { CreateWorkExperienceDTO } from "../../dto/work-experience.dto";
import { statusCode } from "../../utils/status.util";
import { CandidateEntity } from "./../../database/entities/entity/candidate.entity";
import { CompetencyEntity } from "./../../database/entities/entity/competency.entity";
import { InstitutionEntity } from "./../../database/entities/entity/institution.entity";
import { JobSourceEntity } from "./../../database/entities/entity/job-source.entity";
import { PositionTypeEntity } from "./../../database/entities/entity/position-type.entity";
import { getFullDate } from "./../../utils/date.util";

export async function createWorkExperienceService({
  positionUUID,
  candidate,
  institutionUUID,
  jobSourceUUID,
  date_from,
  date_to,
  competencyUUIDs,
  ...payload
}: CreateWorkExperienceDTO & { candidate: CandidateEntity }) {
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

  let foundCompetencies: CompetencyEntity[] | null = [];
  if (competencyUUIDs && competencyUUIDs?.length > 0) {
    foundCompetencies = await CompetencyEntity.find({
      where: {
        uuid: In(competencyUUIDs),
      },
    }).catch((e) => {
      console.error(
        "createWorkExperienceService -> CompetencyEntity.findOneBy: ",
        e
      );
      return null;
    });

    if (
      !foundCompetencies ||
      foundCompetencies.length !== competencyUUIDs.length
    ) {
      return Promise.reject({
        message: "Competencies not found",
        status: statusCode.NOT_FOUND,
      });
    }
  }

  await WorkExperienceEntity.create({
    institution: foundInstitution,
    ...(foundJobSource && { jobSource: foundJobSource }),
    ...(date_from && { date_from: getFullDate(new Date(date_from)) }),
    ...(date_to && { date_to: getFullDate(new Date(date_to)) }),
    position: foundPositionType,
    candidate,
    ...(foundCompetencies && { competencies: foundCompetencies }),
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
