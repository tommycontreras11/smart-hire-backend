import { EducationEntity } from "./../../database/entities/entity/education.entity";
import { InstitutionEntity } from "./../../database/entities/entity/institution.entity";
import { EducationCandidateDTO } from "./../../dto/candidate.dto";
import { getFullDate } from "./../../utils/date.util";
import { statusCode } from "./../../utils/status.util";

export async function updateEducationService({
  uuid,
  title,
  grade,
  description,
  start_date,
  end_date,
  institutionUUID,
}: EducationCandidateDTO) {
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
    where: {
      uuid,
    },
  }).catch((e) => {
    console.error(
      "updateCandidateEducationService -> EducationEntity.findOneBy: ",
      e
    );
    return null;
  });

  if (!foundEducation)
    return Promise.reject({
      message: "Education not found",
      status: statusCode.NOT_FOUND,
    });

  foundEducation.title = title ?? foundEducation.title;
  foundEducation.grade = grade ? parseFloat(grade) : foundEducation.grade;
  foundEducation.description = description ?? foundEducation.description;
  foundEducation.start_date = start_date
    ? new Date(getFullDate(start_date))
    : foundEducation.start_date;
  foundEducation.end_date = end_date
    ? new Date(getFullDate(end_date))
    : foundEducation.end_date;
  foundEducation.institution = foundInstitution;
  await foundEducation.save().catch((e) => {
    console.error("updateCandidateEducationService -> save: ", e);
    return null;
  });

  return "Education updated successfully";
}
