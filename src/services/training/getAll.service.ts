import { statusCode } from "../../utils/status.util";
import { TrainingEntity } from "../../database/entities/entity/training.entity";
import { FindManyOptions } from "typeorm";

export async function getAllTrainingService(
  options?: FindManyOptions<TrainingEntity>
) {
  const training = await TrainingEntity.find(options).catch((e) => {
    console.error("getAllTrainingService -> TrainingEntity.find: ", e);
    return null;
  });

  if (!training)
    return Promise.reject({
      message: "No training found",
      status: statusCode.NOT_FOUND,
    });

  return training;
}
