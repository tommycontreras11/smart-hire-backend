import { CandidateEntity } from "./../../database/entities/entity/candidate.entity";
import { EducationEntity } from "./../../database/entities/entity/education.entity";
import { InstitutionEntity } from "./../../database/entities/entity/institution.entity";
import { EducationCandidateDTO } from "./../../dto/candidate.dto";
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
    candidateUUID,
  }: EducationCandidateDTO
) {
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

  if (title) {
    const foundEducation = await EducationEntity.findOne({
      relations: {
        candidate: true,
        institution: true,
      },
      where: {
        candidate: { uuid: foundCandidate.uuid },
        institution: { uuid: institutionUUID },
        title,
      },
    });

    if (foundEducation)
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
  foundEducation.institution = foundInstitution;

  const educationUpdated = await foundEducation.save().catch((e) => {
    console.error(
      "updateCandidateEducationService -> EducationEntity.update: ",
      e
    );
    return null;
  });

  return {
    success: educationUpdated?.id !== undefined,
    entity: "Education",
  };
}
