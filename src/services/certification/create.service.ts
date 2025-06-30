import { CertificationEntity } from "./../../database/entities/entity/certification.entity";
import { InstitutionEntity } from "./../../database/entities/entity/institution.entity";
import { CertificationCandidateDTO } from "./../../dto/candidate.dto";
import { statusCode } from "./../../utils/status.util";
import { getFullDate } from "./../../utils/date.util";
import { CandidateEntity } from "./../../database/entities/entity/candidate.entity";

export async function createCertificationService({
  name,
  expedition_date,
  expiration_date,
  credential_id,
  credential_link,
  institutionUUID,
  candidateUUID
}: CertificationCandidateDTO) {
    const foundCandidate = await CandidateEntity.findOneBy({
    uuid: candidateUUID,
  }).catch((e) => {
    console.error(
      "updateCandidateProfessionalService -> CandidateEntity.findOneBy: ",
      e
    );
    return null;
  });

  if (!foundCandidate) {
    return Promise.reject({
      message: "Candidate not found",
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

  const foundCertification = await CertificationEntity.findOne({
    relations: { institution: true, candidate: true },
    where: {
      name,
      institution: { id: foundInstitution.id },
      candidate: { uuid: foundCandidate.uuid },
    },
  });

  if (foundCertification)
    return Promise.reject({
      message: "Certification already exists",
      status: statusCode.BAD_REQUEST,
    });

  const certificationSaved = await CertificationEntity.create({
    name,
    ...(expedition_date && { expedition_date: getFullDate(expedition_date) }),
    ...(expiration_date && { expiration_date: getFullDate(expiration_date) }),
    ...(credential_id && { credential_id }),
    ...(credential_link && { credential_link }),
    institution: foundInstitution,
    candidate: foundCandidate,
  })
    .save()
    .catch((e) => {
      console.error(
        "createCertificationService -> CertificationEntity.create: ",
        e
      );
      return null;
    });

  return {
    success: certificationSaved?.id !== undefined,
    entity: "Certification",
  };
}
