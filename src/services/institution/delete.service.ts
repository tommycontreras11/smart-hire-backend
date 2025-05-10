import { InstitutionEntity } from "../../database/entities/entity/institution.entity";
import { statusCode } from "../../utils/status.util";

export async function deleteInstitutionService(uuid: string) {
  const foundInstitution = await InstitutionEntity.findOneBy({ uuid }).catch((e) => {
    console.error("updateInstitutionService -> InstitutionEntity.findOneBy: ", e);
    return null;
  });

  if (!foundInstitution) {
    return Promise.reject({
      message: "Institution not found",
      status: statusCode.NOT_FOUND,
    });
  }

  await foundInstitution.softRemove().catch((e) => {
    console.error("updateInstitutionService -> InstitutionEntity.update: ", e);
    return null;
  });

  return "Institution deleted successfully";
}
