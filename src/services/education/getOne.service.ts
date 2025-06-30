import { FindOneOptions } from "typeorm";
import { statusCode } from "../../utils/status.util";
import { EducationEntity } from "./../../database/entities/entity/education.entity";

export async function getOneEducationService(
  option: FindOneOptions<EducationEntity>
) {
  const foundEducation = await EducationEntity.findOne(option).catch((e) => {
    console.error("getOneEducationService -> EducationEntity.findOne: ", e);
    return null;
  });

  if (!foundEducation) {
    return Promise.reject({
      message: "Education not found",
      status: statusCode.NOT_FOUND,
    });
  }

  return foundEducation;
}
