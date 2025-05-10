import { EvaluationMethodEntity } from "../../database/entities/entity/evaluation-method.entity";
import { CreateEvaluationMethodDTO } from "../../dto/evaluation-method.dto";
import { statusCode } from "../../utils/status.util";

export async function createEvaluationMethodService({ name }: CreateEvaluationMethodDTO) {
  const foundEvaluationMethod = await EvaluationMethodEntity.findOneBy({ name }).catch((e) => {
    console.error("createEvaluationMethodService -> EvaluationMethodEntity.findOneBy: ", e);
    return null;
  });

  if (foundEvaluationMethod) {
    return Promise.reject({
      message: "Evaluation method already exists",
      status: statusCode.BAD_REQUEST,
    });
  }

  await EvaluationMethodEntity.create({
    name,
  })
    .save()
    .catch((e) => {
      console.error("createEvaluationMethodService -> EvaluationMethodEntity.create: ", e);
      return null;
    });

  return "Evaluation method created successfully";
}
