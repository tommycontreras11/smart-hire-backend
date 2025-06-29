import { CandidateEntity } from "./../../database/entities/entity/candidate.entity";
import { EducationEntity } from "./../../database/entities/entity/education.entity";
import { InstitutionEntity } from "./../../database/entities/entity/institution.entity";
import { EducationCandidateDTO } from "./../../dto/candidate.dto";
import { getFullDate } from "./../../utils/date.util";
import { statusCode } from "./../../utils/status.util";

export async function createEducationService({
  candidate,
  title,
  grade,
  description,
  start_date,
  end_date,
  institutionUUID,
}: EducationCandidateDTO & { candidate: CandidateEntity }) {
  const foundInstitution = await InstitutionEntity.findOneBy({
    uuid: institutionUUID,
  }).catch((e) => {
    console.error(
      "updateCandidateEducationService -> InstitutionEntity.findOneBy: ",
      e
    );
    return null;
  });

  if (!foundInstitution)
    return Promise.reject({
      message: "Institution not found",
      status: statusCode.NOT_FOUND,
    });

  const foundEducation = await EducationEntity.findOne({
    relations: {
      candidate: true,
      institution: true,
    },
    where: {
      candidate: { uuid: candidate.uuid },
      institution: { uuid: institutionUUID },
      title,
    },
  });

  if (foundEducation)
    return Promise.reject({
      message: "Education already exists for this candidate and institution",
      status: statusCode.BAD_REQUEST,
    });

  await EducationEntity.create({
    ...(title && { title }),
    ...(grade && { grade: parseFloat(grade) }),
    ...(description && { description }),
    ...(start_date && { start_date: getFullDate(start_date) }),
    ...(end_date && { end_date: getFullDate(end_date) }),
    ...(institutionUUID && { institution: { uuid: institutionUUID } }),
    ...(candidate && { candidate: { uuid: candidate.uuid } }),
  })
    .save()
    .catch((e) => {
      console.error("createEducationService -> save: ", e);
      return null;
    });

  return "Education created successfully";
}
