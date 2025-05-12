import { WorkExperienceEntity } from "../../database/entities/entity/work-experience.entity";
import { CreateWorkExperienceDTO } from "../../dto/work-experience.dto";
import { statusCode } from "../../utils/status.util";
import { PositionTypeEntity } from "./../../database/entities/entity/position-type.entity";

export async function createWorkExperienceService({
  company,
  salary,
  positionUUID,
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

  const workExperienceSaved = await WorkExperienceEntity.create({
    company,
    salary: parseFloat(salary),
    position: foundPositionType,
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

  if (!workExperienceSaved) {
    return Promise.reject({
      message: "Work experience not created",
      status: statusCode.BAD_REQUEST,
    });
  }

  return workExperienceSaved;
}