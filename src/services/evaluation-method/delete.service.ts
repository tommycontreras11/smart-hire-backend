import { EvaluationMethodEntity } from "../../database/entities/entity/evaluation-method.entity";
import { statusCode } from "../../utils/status.util";

export async function deleteEvaluationMethodService(uuid: string) {
  const foundEvaluationMethod = await EvaluationMethodEntity.findOneBy({ uuid }).catch((e) => {
    console.error("updateEvaluationMethodService -> EvaluationMethodEntity.findOneBy: ", e);
    return null;
  });

  if (!foundEvaluationMethod) {
    return Promise.reject({
      message: "Evaluation method not found",
      status: statusCode.NOT_FOUND,
    });
  }

  await foundEvaluationMethod.softRemove().catch((e) => {
    console.error("updateEvaluationMethodService -> EvaluationMethodEntity.update: ", e);
    return null;
  });

  return "Evaluation method deleted successfully";
}
