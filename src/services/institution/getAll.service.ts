import { statusCode } from "../../utils/status.util";
import { InstitutionEntity } from "../../database/entities/entity/institution.entity";
import { FindManyOptions } from "typeorm";

export async function getAllInstitutionService(
  options?: FindManyOptions<InstitutionEntity>
) {
  const institutions = await InstitutionEntity.find(options).catch((e) => {
    console.error("getAllInstitutionService -> InstitutionEntity.find: ", e);
    return null;
  });

  if (!institutions)
    return Promise.reject({
      message: "No institution found",
      status: statusCode.NOT_FOUND,
    });

  return institutions;
}
