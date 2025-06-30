import { CandidateEntity } from "./../../database/entities/entity/candidate.entity";
import { EducationEntity } from "./../../database/entities/entity/education.entity";
import { InstitutionEntity } from "./../../database/entities/entity/institution.entity";
import { EducationCandidateDTO } from "./../../dto/candidate.dto";
import { getFullDate } from "./../../utils/date.util";
import { statusCode } from "./../../utils/status.util";

export async function createEducationService({
  title,
  grade,
  description,
  start_date,
  end_date,
  institutionUUID,
  candidateUUID,
}: EducationCandidateDTO) {
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

  const educationSaved = await EducationEntity.create({
    ...(title && { title }),
    ...(grade && { grade: parseFloat(grade) }),
    ...(description && { description }),
    ...(start_date && { start_date: getFullDate(start_date) }),
    ...(end_date && { end_date: getFullDate(end_date) }),
    institution: foundInstitution,
    candidate: foundCandidate
  })
    .save()
    .catch((e) => {
      console.error("createEducationService -> save: ", e);
      return null;
    });

  return {
    success: educationSaved?.id !== undefined,
    entity: "Education",
  };
}
