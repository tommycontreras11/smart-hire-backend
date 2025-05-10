import { statusCode } from "../../utils/status.util";
import { EvaluationMethodEntity } from "../../database/entities/entity/evaluation-method.entity";
import { FindManyOptions } from "typeorm";

export async function getAllEvaluationMethodService(
  options?: FindManyOptions<EvaluationMethodEntity>
) {
  const positionTypes = await EvaluationMethodEntity.find(options).catch((e) => {
    console.error("getAllEvaluationMethodService -> EvaluationMethodEntity.find: ", e);
    return null;
  });

  if (!positionTypes)
    return Promise.reject({
      message: "No position types found",
      status: statusCode.NOT_FOUND,
    });

  return positionTypes;
}
