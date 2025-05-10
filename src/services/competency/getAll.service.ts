import { statusCode } from "../../utils/status.util";
import { CompetencyEntity } from "../../database/entities/entity/competency.entity";
import { FindManyOptions } from "typeorm";

export async function getAllCompetencyService(
  options?: FindManyOptions<CompetencyEntity>
) {
  const competencies = await CompetencyEntity.find(options).catch((e) => {
    console.error("getAllCompetencyService -> CompetencyEntity.find: ", e);
    return null;
  });

  if (!competencies)
    return Promise.reject({
      message: "No competencies found",
      status: statusCode.NOT_FOUND,
    });

  return competencies;
}