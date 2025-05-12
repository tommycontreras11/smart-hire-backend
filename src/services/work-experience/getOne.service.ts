import { statusCode } from "../../utils/status.util";
import { WorkExperienceEntity } from "../../database/entities/entity/work-experience.entity";
import { FindOneOptions } from "typeorm";

export async function getOneWorkExperienceService(
  option: FindOneOptions<WorkExperienceEntity>
) {
  const foundWorkExperience = await WorkExperienceEntity.findOne(option).catch((e) => {
    console.error("getOneWorkExperienceService -> WorkExperienceEntity.findOne: ", e);
    return null;
  });

  if (!foundWorkExperience) {
    return Promise.reject({
      message: "Work experience not found",
      status: statusCode.NOT_FOUND,
    });
  }

  return foundWorkExperience;
}