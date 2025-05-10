import { statusCode } from "../../utils/status.util";
import { EvaluationMethodEntity } from "../../database/entities/entity/evaluation-method.entity";
import { FindOneOptions } from "typeorm";

export async function getOneEvaluationMethodService(
  option: FindOneOptions<EvaluationMethodEntity>
) {
  const foundEvaluationMethod = await EvaluationMethodEntity.findOne(option).catch((e) => {
    console.error("getOneEvaluationMethodService -> EvaluationMethodEntity.findOne: ", e);
    return null;
  });

  if (!foundEvaluationMethod) {
    return Promise.reject({
      message: "Evaluation method not found",
      status: statusCode.NOT_FOUND,
    });
  }

  return foundEvaluationMethod;
}
