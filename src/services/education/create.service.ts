import { AcademicDisciplineEntity } from "./../../database/entities/entity/academic-discipline.entity";
import { EducationEntity } from "./../../database/entities/entity/education.entity";
import { InstitutionEntity } from "./../../database/entities/entity/institution.entity";
import { CreateEducationDTO } from "./../../dto/education.dto";
import { getFullDate } from "./../../utils/date.util";
import { statusCode } from "./../../utils/status.util";

export async function createEducationService({
    candidateUUID,
    title,
    grade,
    description,
    start_date,
    end_date,
    institutionUUID,
    academicDisciplineUUID,
  }: CreateEducationDTO & { candidateUUID: string }
) {
  const foundInstitution = await InstitutionEntity.findOneBy({
    uuid: institutionUUID,
  }).catch((e) => {
    console.error("createEducationService -> InstitutionEntity.findOneBy: ", e);
    return null;
  });

  if (!foundInstitution)
    return Promise.reject({
      message: "Institution not found",
      status: statusCode.NOT_FOUND,
    });

  let foundAcademicDiscipline: AcademicDisciplineEntity | null = null;
  if (academicDisciplineUUID) {
    foundAcademicDiscipline = await AcademicDisciplineEntity.findOneBy({
      uuid: academicDisciplineUUID,
    }).catch((e) => {
      console.error(
        "createEducationService -> AcademicDisciplineEntity.findOneBy: ",
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

  const foundEducation = await EducationEntity.findOne({
    relations: {
      candidate: true,
      institution: true,
    },
    where: {
      candidate: { uuid: candidateUUID },
      institution: { uuid: institutionUUID },
      title,
    },
  });

  if (foundEducation)
    return Promise.reject({
      message: "Education already exists for this candidate and institution",
      status: statusCode.BAD_REQUEST,
    });

  const educationSaved = await EducationEntity.create({
    ...(title && { title }),
    ...(grade && { grade: parseFloat(grade) }),
    ...(description && { description }),
    ...(start_date && { start_date: getFullDate(start_date) }),
    ...(end_date && { end_date: getFullDate(end_date) }),
    institution: foundInstitution,
    candidate: { uuid: candidateUUID },
    ...(foundAcademicDiscipline && {
      academicDiscipline: foundAcademicDiscipline,
    }),
  })
    .save()
    .catch((e) => {
      console.error("createEducationService -> save: ", e);
      return null;
    });

  if (!educationSaved)
    return Promise.reject({
      message: "Error creating education",
      status: statusCode.INTERNAL_SERVER_ERROR,
    });

  return "Education created successfully";
}
