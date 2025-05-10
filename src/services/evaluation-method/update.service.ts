import { statusCode } from "../../utils/status.util";
import { EvaluationMethodEntity } from "../../database/entities/entity/evaluation-method.entity";
import { UpdateEvaluationMethodDTO } from "../../dto/evaluation-method.dto";
import { Not } from "typeorm";

export async function updateEvaluationMethodService(
  uuid: string,
  { name, status }: UpdateEvaluationMethodDTO
) {
  const foundEvaluationMethod = await EvaluationMethodEntity.findOneBy({
    uuid,
  }).catch((e) => {
    console.error(
      "updateEvaluationMethodService -> EvaluationMethodEntity.findOneBy: ",
      e
    );
    return null;
  });

  if (!foundEvaluationMethod) {
    return Promise.reject({
      message: "Evaluation method not found",
      status: statusCode.NOT_FOUND,
    });
  }

  if (name) {
    const existingEvaluationMethod = await EvaluationMethodEntity.findOne({
      where: { name, uuid: Not(uuid) },
    }).catch((e) => {
      console.error(
        "updateEvaluationMethodService -> EvaluationMethodEntity.findOneBy: ",
        e
      );
      return null;
    });

    if (existingEvaluationMethod) {
      return Promise.reject({
        message: "Evaluation method already exists",
        status: statusCode.BAD_REQUEST,
      });
    }
  }

  await EvaluationMethodEntity.update(
    { uuid },
    { ...(name && { name }), ...(status && { status }) }
  ).catch((e) => {
    console.error(
      "updateEvaluationMethodService -> EvaluationMethodEntity.update: ",
      e
    );
    return null;
  });

  return "Evaluation method updated successfully";
}