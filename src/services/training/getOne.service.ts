import { statusCode } from "../../utils/status.util";
import { TrainingEntity } from "../../database/entities/entity/training.entity";
import { FindOneOptions } from "typeorm";

export async function getOneTrainingService(
  option: FindOneOptions<TrainingEntity>
) {
  const foundTraining = await TrainingEntity.findOne(option).catch((e) => {
    console.error("getOneTrainingService -> TrainingEntity.findOne: ", e);
    return null;
  });

  if (!foundTraining) {
    return Promise.reject({
      message: "Training not found",
      status: statusCode.NOT_FOUND,
    });
  }

  return foundTraining;
}
