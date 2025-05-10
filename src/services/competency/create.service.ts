import { In } from "typeorm";
import { CompetencyEntity } from "../../database/entities/entity/competency.entity";
import { CreateCompetencyDTO } from "../../dto/competency.dto";
import { statusCode } from "../../utils/status.util";
import { EvaluationMethodEntity } from "./../../database/entities/entity/evaluation-method.entity";
import { PositionTypeEntity } from "./../../database/entities/entity/position-type.entity";
import { CategoryEntity } from "./../../database/entities/entity/category.entity";

export async function createCompetencyService({
  name,
  categoryUUID,
  level,
  evaluationMethodUUIDs,
  positionTypeUUIDs,
}: CreateCompetencyDTO) {
  const foundCompetency = await CompetencyEntity.findOneBy({ name }).catch(
    (e) => {
      console.error(
        "createCompetencyService -> CompetencyEntity.findOneBy: ",
        e
      );
      return null;
    }
  );

  if (foundCompetency) {
    return Promise.reject({
      message: "Competency already exists",
      status: statusCode.BAD_REQUEST,
    });
  }

  const foundCategory = await CategoryEntity.findOneBy({
    uuid: categoryUUID,
  }).catch((e) => {
    console.error("createCompetencyService -> CategoryEntity.findOneBy: ", e);
    return null;
  });

  if (!foundCategory) {
    return Promise.reject({
      message: "Category not found",
      status: statusCode.NOT_FOUND,
    });
  }

  const foundEvaluationMethods = await EvaluationMethodEntity.find({
    where: { uuid: In(evaluationMethodUUIDs) },
  }).catch((e) => {
    console.error(
      "createCompetencyService -> EvaluationMethodEntity.findOneBy: ",
      e
    );
    return null;
  });

  if (
    !foundEvaluationMethods ||
    foundEvaluationMethods.length !== evaluationMethodUUIDs.length
  ) {
    return Promise.reject({
      message: "Evaluation methods not found",
      status: statusCode.NOT_FOUND,
    });
  }

  const foundPositionTypes = await PositionTypeEntity.find({
    where: { uuid: In(positionTypeUUIDs) },
  }).catch((e) => {
    console.error(
      "createCompetencyService -> PositionTypeEntity.findOneBy: ",
      e
    );
    return null;
  });

  if (
    !foundPositionTypes ||
    foundPositionTypes.length !== positionTypeUUIDs.length
  ) {
    return Promise.reject({
      message: "Position types not found",
      status: statusCode.NOT_FOUND,
    });
  }

  await CompetencyEntity.create({
    name,
    level,
    category_id: foundCategory.id,
    evaluationMethods: foundEvaluationMethods,
    positionTypes: foundPositionTypes,
  })
    .save()
    .catch((e) => {
      console.error("createCompetencyService -> CompetencyEntity.create: ", e);
      return null;
    });

  return "Competency created successfully";
}