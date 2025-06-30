import { CandidateEntity } from "./../../database/entities/entity/candidate.entity";
import { CertificationEntity } from "./../../database/entities/entity/certification.entity";
import { InstitutionEntity } from "./../../database/entities/entity/institution.entity";
import { CertificationCandidateDTO } from "./../../dto/candidate.dto";
import { getFullDate } from "./../../utils/date.util";
import { statusCode } from "./../../utils/status.util";

export async function updateCertificationService(uuid: string, {
  name,
  candidate,
  expedition_date,
  expiration_date,
  credential_id,
  credential_link,
  institutionUUID,
}: CertificationCandidateDTO & { candidate: CandidateEntity }) {
  const foundCertification = await CertificationEntity.findOneBy({
    uuid,
  }).catch((e) => {
    console.error(
      "updateCertificationService -> CertificationEntity.findOneBy: ",
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
    const foundCertification = await CertificationEntity.findOne({
      relations: { candidate: true, institution: true },
      where: {
        name,
        candidate: { uuid: candidate.uuid },
        institution: { id: foundInstitution.id },
      },
    });

    if (foundCertification)
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
  foundCertification.institution = foundInstitution;

  const certificationUpdated = await foundCertification.save().catch((e) => {
    console.error(
      "updateCertificationService -> CertificationEntity.update: ",
      e
    );
    return null;
  });

  return {
    success: certificationUpdated?.id !== undefined,
    entity: "Certification",
  };
}
