import { statusCode } from "../../utils/status.util";
import { CompetencyEntity } from "../../database/entities/entity/competency.entity";
import { UpdateCompetencyDTO } from "../../dto/competency.dto";
import { In, Not } from "typeorm";
import { EvaluationMethodEntity } from "./../../database/entities/entity/evaluation-method.entity";
import { PositionTypeEntity } from "./../../database/entities/entity/position-type.entity";
import { CategoryEntity } from "./../../database/entities/entity/category.entity";

export async function updateCompetencyService(
  uuid: string,
  {
    name,
    categoryUUID,
    level,
    evaluationMethodUUIDs,
    positionTypeUUIDs,
    status,
  }: UpdateCompetencyDTO
) {
  const foundCompetency = await CompetencyEntity.findOneBy({ uuid }).catch(
    (e) => {
      console.error(
        "updateCompetencyService -> CompetencyEntity.findOneBy: ",
        e
      );
      return null;
    }
  );

  if (!foundCompetency) {
    return Promise.reject({
      message: "Competency not found",
      status: statusCode.NOT_FOUND,
    });
  }

  if (name) {
    const existingCompetency = await CompetencyEntity.findOne({
      where: { name, uuid: Not(uuid) },
    }).catch((e) => {
      console.error(
        "updateCompetencyService -> CompetencyEntity.findOneBy: ",
        e
      );
      return null;
    });

    if (existingCompetency) {
      return Promise.reject({
        message: "Competency already exists",
        status: statusCode.BAD_REQUEST,
      });
    }
  }
  let foundCategory: CategoryEntity | null = null;

  if (categoryUUID) {
    foundCategory = await CategoryEntity.findOneBy({
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
  }

  let foundEvaluationMethods: EvaluationMethodEntity[] | null = [];
  if (evaluationMethodUUIDs.length > 0) {
    foundEvaluationMethods = await EvaluationMethodEntity.find({
      where: { uuid: In(evaluationMethodUUIDs) },
    }).catch((e) => {
      console.error(
        "updateCompetencyService -> EvaluationMethodEntity.findOneBy: ",
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
  }

  let foundPositionTypes: PositionTypeEntity[] | null = [];
  if (positionTypeUUIDs.length > 0) {
    foundPositionTypes = await PositionTypeEntity.find({
      where: { uuid: In(positionTypeUUIDs) },
    }).catch((e) => {
      console.error(
        "updateCompetencyService -> PositionTypeEntity.findOneBy: ",
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
  }

  foundCompetency.name = name;
  foundCompetency.category_id =
    foundCategory?.id ?? foundCompetency.category_id;
  foundCompetency.level = level ?? foundCompetency.level;
  foundCompetency.evaluationMethods =
    foundEvaluationMethods ?? foundCompetency.evaluationMethods;
  foundCompetency.positionTypes =
    foundPositionTypes ?? foundCompetency.positionTypes;
  foundCompetency.status = status ?? foundCompetency.status;

  await foundCompetency.save().catch((e) => {
    console.error("updateCompetencyService -> CompetencyEntity.update: ", e);
    return null;
  });

  return "Competency updated successfully";
}