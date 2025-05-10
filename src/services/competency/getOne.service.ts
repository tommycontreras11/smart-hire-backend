import { statusCode } from "../../utils/status.util";
import { CompetencyEntity } from "../../database/entities/entity/competency.entity";
import { FindOneOptions } from "typeorm";

export async function getOneCompetencyService(
  option: FindOneOptions<CompetencyEntity>
) {
  const foundCompetency = await CompetencyEntity.findOne(option).catch((e) => {
    console.error("getOneCompetencyService -> CompetencyEntity.findOne: ", e);
    return null;
  });

  if (!foundCompetency) {
    return Promise.reject({
      message: "Competency not found",
      status: statusCode.NOT_FOUND,
    });
  }

  return foundCompetency;
}