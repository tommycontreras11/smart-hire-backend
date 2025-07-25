import { In } from "typeorm";
import { CandidateEntity } from "./../../database/entities/entity/candidate.entity";
import { CertificationEntity } from "./../../database/entities/entity/certification.entity";
import { CompetencyEntity } from "./../../database/entities/entity/competency.entity";
import { InstitutionEntity } from "./../../database/entities/entity/institution.entity";
import { CreateCertificationDTO } from "./../../dto/certification.dto";
import { getFullDate } from "./../../utils/date.util";
import { statusCode } from "./../../utils/status.util";

export async function createCertificationService({
  candidate,
  name,
  expedition_date,
  expiration_date,
  credential_id,
  credential_link,
  institutionUUID,
  competencyUUIDs,
}: CreateCertificationDTO & { candidate: CandidateEntity }) {
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
      candidate: { uuid: candidate.uuid },
    },
  });

  if (foundCertification)
    return Promise.reject({
      message: "Certification already exists",
      status: statusCode.BAD_REQUEST,
    });

  let foundCompetencies: CompetencyEntity[] | null = [];
  if (competencyUUIDs && competencyUUIDs?.length > 0) {
    foundCompetencies = await CompetencyEntity.find({
      where: {
        uuid: In(competencyUUIDs),
      },
    }).catch((e) => {
      console.error(
        "createCertificationService -> CompetencyEntity.findOneBy: ",
        e
      );
      return null;
    });

    if (
      !foundCompetencies ||
      foundCompetencies.length !== competencyUUIDs.length
    ) {
      return Promise.reject({
        message: "Competencies not found",
        status: statusCode.NOT_FOUND,
      });
    }
  }

  await CertificationEntity.create({
    name,
    ...(expedition_date && {
      expedition_date: getFullDate(new Date(expedition_date)),
    }),
    ...(expiration_date && {
      expiration_date: getFullDate(new Date(expiration_date)),
    }),
    ...(credential_id && { credential_id }),
    ...(credential_link && { credential_link }),
    institution: foundInstitution,
    ...(foundCompetencies && { competencies: foundCompetencies }),
    candidate,
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
