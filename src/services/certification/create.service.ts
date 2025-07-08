import { CertificationEntity } from "./../../database/entities/entity/certification.entity";
import { InstitutionEntity } from "./../../database/entities/entity/institution.entity";
import { CreateCertificationDTO } from "./../../dto/certification.dto";
import { getFullDate } from "./../../utils/date.util";
import { statusCode } from "./../../utils/status.util";

export async function createCertificationService({
  candidateUUID,
  name,
  expedition_date,
  expiration_date,
  credential_id,
  credential_link,
  institutionUUID,
}: CreateCertificationDTO & { candidateUUID: string }) {
  const foundInstitution = await InstitutionEntity.findOneBy({
    uuid: institutionUUID,
  }).catch((e) => {
    console.error(
      "createCertificationService -> InstitutionEntity.findOneBy: ",
      e
    );
    return null;
  });

  if (!foundInstitution) {
    return Promise.reject({
      message: "Institution not found",
      status: statusCode.NOT_FOUND,
    });
  }

  const foundCertification = await CertificationEntity.findOne({
    relations: { institution: true, candidate: true },
    where: {
      name,
      institution: { id: foundInstitution.id },
      candidate: { uuid: candidateUUID },
    },
  });

  if (foundCertification)
    return Promise.reject({
      message: "Certification already exists",
      status: statusCode.BAD_REQUEST,
    });

  await CertificationEntity.create({
    name,
    ...(expedition_date && { expedition_date: getFullDate(expedition_date) }),
    ...(expiration_date && { expiration_date: getFullDate(expiration_date) }),
    ...(credential_id && { credential_id }),
    ...(credential_link && { credential_link }),
    institution: foundInstitution,
    candidate: { uuid: candidateUUID },
  })
    .save()
    .catch((e) => {
      console.error(
        "createCertificationService -> CertificationEntity.create: ",
        e
      );
      return null;
    });

  return "Certification created successfully";
}
