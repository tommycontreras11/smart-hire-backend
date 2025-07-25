import { UpdateCandidateProfileDTO } from "./../../dto/candidate.dto";
import { createCertificationService } from "./../../services/certification/create.service";
import { updateCertificationService } from "./../../services/certification/update.service";
import { createEducationService } from "./../../services/education/create.service";
import { updateEducationService } from "./../../services/education/update.service";
import { createWorkExperienceService } from "./../../services/work-experience/create.service";
import { updateWorkExperienceService } from "./../../services/work-experience/update.service";
import { statusCode } from "./../../utils/status.util";
import { getOneCandidateService } from "./getOne.service";
import { updateCandidateService } from "./update.service";

export async function updateCandidateProfileService(
  uuid: string,
  { personal, professional }: UpdateCandidateProfileDTO
) {
  const hasAnyEducationValue = Object.values(
    professional?.education || {}
  ).some((val) => val !== null && val !== undefined && val !== "");

  const hasAnyCertificationValue = Object.values(
    professional?.certification || {}
  ).some((val) => val !== null && val !== undefined && val !== "");

  const hasAnyWorkExperienceValue = Object.values(
    professional?.workExperience || {}
  ).some((val) => val !== null && val !== undefined && val !== "");

  const foundCandidate = await getOneCandidateService({ where: { uuid } }).catch((e) => {
    console.error("updateCandidateProfileService -> getOneCandidateService: ", e);
    return null;
  });

  if (!foundCandidate) {
    return Promise.reject({
      message: "Candidate not found",
      status: statusCode.NOT_FOUND,
    });
  }

  await updateCandidateService(
    uuid,
    {
      ...personal,
      competencyUUIDs: professional?.competencyUUIDs || [],
    }
  );

  if (professional?.education?.uuid) {
    await updateEducationService(
      professional.education.uuid,
      professional.education
    );
  } else {
    hasAnyEducationValue &&
      (await createEducationService({
        ...professional?.education,
        candidate: foundCandidate,
      }));
  }

  if (professional?.certification?.uuid) {
    await updateCertificationService(
      professional.certification.uuid,
      professional.certification
    );
  } else {
    hasAnyCertificationValue &&
      (await createCertificationService({
        ...professional?.certification,
        candidate: foundCandidate,
      }));
  }

  if (professional?.workExperience?.uuid) {
    await updateWorkExperienceService(
      professional.workExperience.uuid,
      professional.workExperience
    );
  } else {
    hasAnyWorkExperienceValue &&
      (await createWorkExperienceService({
        ...professional?.workExperience,
        candidate: foundCandidate,
      }));
  }

  return "Candidate profile updated successfully";
}
