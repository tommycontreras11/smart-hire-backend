import { InstitutionEntity } from "./../../database/entities/entity/institution.entity";
import { TrainingEntity } from "../../database/entities/entity/training.entity";
import { CreateTrainingDTO } from "../../dto/training.dto";
import { statusCode } from "../../utils/status.util";

export async function createTrainingService({ name, institutionUUID, ...payload }: CreateTrainingDTO) {
  const foundTraining = await TrainingEntity.findOneBy({ name }).catch((e) => {
    console.error("createTrainingService -> TrainingEntity.findOneBy: ", e);
    return null;
  });

  if (foundTraining) {
    return Promise.reject({
      message: "Training already exists",
      status: statusCode.BAD_REQUEST,
    });
  }

  const foundInstitution = await InstitutionEntity.findOneBy({ uuid: institutionUUID }).catch((e) => {
    console.error("createTrainingService -> InstitutionEntity.findOneBy: ", e);
    return null;
  });

  if (!foundInstitution) {
    return Promise.reject({
      message: "Institution not found",
      status: statusCode.NOT_FOUND,
    });
  }

  await TrainingEntity.create({
    name,
    institution: foundInstitution,
    ...payload,
  })
    .save()
    .catch((e) => {
      console.error("createTrainingService -> TrainingEntity.create: ", e);
      return null;
    });

  return "Training created successfully";
}
