import { TrainingEntity } from "../../database/entities/entity/training.entity";
import { statusCode } from "../../utils/status.util";

export async function deleteTrainingService(uuid: string) {
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

  await foundTraining.softRemove().catch((e) => {
    console.error("updateTrainingService -> TrainingEntity.update: ", e);
    return null;
  });

  return "Training deleted successfully";
}
