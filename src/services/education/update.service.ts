import { AcademicDisciplineEntity } from "./../../database/entities/entity/academic-discipline.entity";
import { EducationEntity } from "./../../database/entities/entity/education.entity";
import { InstitutionEntity } from "./../../database/entities/entity/institution.entity";
import { UpdateEducationDTO } from "./../../dto/education.dto";
import { getFullDate } from "./../../utils/date.util";
import { statusCode } from "./../../utils/status.util";

export async function updateEducationService(
  uuid: string,
  {
    title,
    grade,
    description,
    start_date,
    end_date,
    institutionUUID,
    academicDisciplineUUID,
  }: UpdateEducationDTO
) {
  const foundEducation = await EducationEntity.findOne({
    relations: {
      candidate: true,
      institution: true,
      academicDiscipline: true,
    },
    where: {
      uuid,
    },
  }).catch((e) => {
    console.error("updateEducationService -> EducationEntity.findOne: ", e);
    return null;
  });

  if (!foundEducation)
    return Promise.reject({
      message: "Education not found",
      status: statusCode.NOT_FOUND,
    });

  let foundInstitution: InstitutionEntity | null = null;
  if (institutionUUID) {
    foundInstitution = await InstitutionEntity.findOneBy({
      uuid: institutionUUID,
    }).catch((e) => {
      console.error(
        "updateEducationService -> InstitutionEntity.findOneBy: ",
        e
      );
      return null;
    });

    if (!foundInstitution)
      return Promise.reject({
        message: "Institution not found",
        status: statusCode.NOT_FOUND,
      });
  }

  let foundAcademicDiscipline: AcademicDisciplineEntity | null = null;
  if (academicDisciplineUUID) {
    foundAcademicDiscipline = await AcademicDisciplineEntity.findOneBy({
      uuid: academicDisciplineUUID,
    }).catch((e) => {
      console.error(
        "updateCandidateEducationService -> AcademicDisciplineEntity.findOneBy: ",
        e
      );
      return null;
    });

    if (!foundAcademicDiscipline)
      return Promise.reject({
        message: "Academic Discipline not found",
        status: statusCode.NOT_FOUND,
      });
  }

  if (title) {
    const foundEducationTitle = await EducationEntity.findOneBy({
      title,
      candidate: { uuid: foundEducation.candidate.uuid },
      institution: { uuid: institutionUUID ?? foundEducation.institution.uuid },
    });

    if (foundEducationTitle)
      return Promise.reject({
        message: "Education already exists for this candidate and institution",
        status: statusCode.BAD_REQUEST,
      });
  }

  foundEducation.title = title ?? foundEducation.title;
  foundEducation.grade = grade ? parseFloat(grade) : foundEducation.grade;
  foundEducation.description = description ?? foundEducation.description;
  foundEducation.start_date = start_date
    ? new Date(getFullDate(start_date))
    : foundEducation.start_date;
  foundEducation.end_date = end_date
    ? new Date(getFullDate(end_date))
    : foundEducation.end_date;
  foundEducation.institution = foundInstitution ?? foundEducation.institution;

  await foundEducation.save().catch((e) => {
    console.error(
      "updateCandidateEducationService -> EducationEntity.update: ",
      e
    );
    return null;
  });

  return "Education updated successfully";
}
