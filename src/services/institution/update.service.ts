import { statusCode } from "../../utils/status.util";
import { InstitutionEntity } from "../../database/entities/entity/institution.entity";
import { UpdateInstitutionDTO } from "../../dto/institution.dto";
import { Not } from "typeorm";

export async function updateInstitutionService(
  uuid: string,
  { name, status }: UpdateInstitutionDTO
) {
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

  if (name) {
    const existingInstitution = await InstitutionEntity.findOne({
      where: { name, uuid: Not(uuid) },
    }).catch((e) => {
      console.error("updateInstitutionService -> InstitutionEntity.findOneBy: ", e);
      return null;
    });

    if (existingInstitution) {
      return Promise.reject({
        message: "Institution already exists",
        status: statusCode.BAD_REQUEST,
      });
    }
  }

  await InstitutionEntity.update(
    { uuid },
    { ...(name && { name }), ...(status && { status }) }
  ).catch((e) => {
    console.error("updateInstitutionService -> InstitutionEntity.update: ", e);
    return null;
  });

  return "Institution updated successfully";
}