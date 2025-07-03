import { CertificationEntity } from "./../../database/entities/entity/certification.entity";
import { InstitutionEntity } from "./../../database/entities/entity/institution.entity";
import { UpdateCertificationDTO } from "./../../dto/certification.dto";
import { getFullDate } from "./../../utils/date.util";
import { statusCode } from "./../../utils/status.util";

export async function updateCertificationService(
  uuid: string,
  {
    name,
    expedition_date,
    expiration_date,
    credential_id,
    credential_link,
    institutionUUID,
  }: UpdateCertificationDTO
) {
  const foundCertification = await CertificationEntity.findOne({
    relations: {
      candidate: true,
      institution: true,
    },
    where: { uuid },
  }).catch((e) => {
    console.error(
      "updateCertificationService -> CertificationEntity.findOne: ",
      e
    );
    return null;
  });

  if (!foundCertification) {
    return Promise.reject({
      message: "Certification not found",
      status: statusCode.NOT_FOUND,
    });
  }

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

  if (name) {
    const existingCertification = await CertificationEntity.findOneBy({
      name,
      candidate: { uuid: foundCertification.candidate.uuid },
      institution: {
        uuid: foundInstitution.uuid ?? foundCertification.institution.uuid,
      },
    });

    if (existingCertification)
      return Promise.reject({
        message: "Certification already exists",
        status: statusCode.BAD_REQUEST,
      });
  }

  foundCertification.name = name ?? foundCertification.name;
  foundCertification.expedition_date = expedition_date
    ? new Date(getFullDate(expedition_date))
    : foundCertification.expedition_date;
  foundCertification.expiration_date = expiration_date
    ? new Date(getFullDate(expiration_date))
    : foundCertification.expiration_date;
  foundCertification.credential_id =
    credential_id ?? foundCertification.credential_id;
  foundCertification.credential_link =
    credential_link ?? foundCertification.credential_link;
  foundCertification.institution =
    foundInstitution ?? foundCertification.institution;

  await foundCertification.save().catch((e) => {
    console.error(
      "updateCertificationService -> CertificationEntity.update: ",
      e
    );
    return null;
  });

  return "Certification updated successfully";
}
