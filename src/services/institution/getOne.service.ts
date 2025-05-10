import { statusCode } from "../../utils/status.util";
import { InstitutionEntity } from "../../database/entities/entity/institution.entity";
import { FindOneOptions } from "typeorm";

export async function getOneInstitutionService(
  option: FindOneOptions<InstitutionEntity>
) {
  const foundInstitution = await InstitutionEntity.findOne(option).catch((e) => {
    console.error("getOneInstitutionService -> InstitutionEntity.findOne: ", e);
    return null;
  });

  if (!foundInstitution) {
    return Promise.reject({
      message: "Institution not found",
      status: statusCode.NOT_FOUND,
    });
  }

  return foundInstitution;
}
