import { statusCode } from "../../utils/status.util";
import { TrainingEntity } from "../../database/entities/entity/training.entity";
import { UpdateTrainingDTO } from "../../dto/training.dto";
import { Not } from "typeorm";
import { InstitutionEntity } from "./../../database/entities/entity/institution.entity";
import { getFullDate } from "./../../utils/date.util";

export async function updateTrainingService(
  uuid: string,
  {
    name,
    description,
    level,
    date_from,
    date_to,
    institutionUUID,
    status,
  }: UpdateTrainingDTO
) {
  const foundTraining = await TrainingEntity.findOneBy({ uuid }).catch((e) => {
    console.error("updateTrainingService -> TrainingEntity.findOneBy: ", e);
    return null;
  });

  if (!foundTraining) {
    return Promise.reject({
      message: "Training not found",
      status: statusCode.NOT_FOUND,
    });
  }

  if (name) {
    const existingTraining = await TrainingEntity.findOne({
      where: { name, uuid: Not(uuid) },
    }).catch((e) => {
      console.error("updateTrainingService -> TrainingEntity.findOneBy: ", e);
      return null;
    });

    if (existingTraining) {
      return Promise.reject({
        message: "Training already exists",
        status: statusCode.BAD_REQUEST,
      });
    }
  }

  let foundInstitution: InstitutionEntity | null = null;
  if (institutionUUID) {
    foundInstitution = await InstitutionEntity.findOneBy({
      uuid: institutionUUID,
    }).catch((e) => {
      console.error(
        "updateTrainingService -> InstitutionEntity.findOneBy: ",
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

  await TrainingEntity.update(
    { uuid },
    {
      ...(name && { name }),
      ...(description && { description }),
      ...(level && { level }),
      ...(date_from && { date_from: getFullDate(new Date(date_from)) }),
      ...(date_to && { date_to: getFullDate(new Date(date_to)) }),
      ...(foundInstitution && { institution: foundInstitution }),
      ...(status && { status }),
    }
  ).catch((e) => {
    console.error("updateTrainingService -> TrainingEntity.update: ", e);
    return null;
  });

  return "Training updated successfully";
}
