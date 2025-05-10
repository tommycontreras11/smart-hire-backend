import { InstitutionEntity } from "../../database/entities/entity/institution.entity";
import { CreateInstitutionDTO } from "../../dto/institution.dto";
import { statusCode } from "../../utils/status.util";

export async function createInstitutionService({ name }: CreateInstitutionDTO) {
  const foundInstitution = await InstitutionEntity.findOneBy({ name }).catch((e) => {
    console.error("createInstitutionService -> InstitutionEntity.findOneBy: ", e);
    return null;
  });

  if (foundInstitution) {
    return Promise.reject({
      message: "Institution already exists",
      status: statusCode.BAD_REQUEST,
    });
  }

  await InstitutionEntity.create({
    name,
  })
    .save()
    .catch((e) => {
      console.error("createInstitutionService -> InstitutionEntity.create: ", e);
      return null;
    });

  return "Institution created successfully";
}
