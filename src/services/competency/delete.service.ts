import { CompetencyEntity } from "../../database/entities/entity/competency.entity";
import { statusCode } from "../../utils/status.util";

export async function deleteCompetencyService(uuid: string) {
  const foundCompetency = await CompetencyEntity.findOneBy({ uuid }).catch((e) => {
    console.error("updateCompetencyService -> CompetencyEntity.findOneBy: ", e);
    return null;
  });

  if (!foundCompetency) {
    return Promise.reject({
      message: "Competency not found",
      status: statusCode.NOT_FOUND,
    });
  }

  await foundCompetency.softRemove().catch((e) => {
    console.error("updateCompetencyService -> CompetencyEntity.update: ", e);
    return null;
  });

  return "Competency deleted successfully";
}
