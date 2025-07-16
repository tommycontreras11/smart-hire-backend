import { UpdateCandidateProfileDTO } from "./../../dto/candidate.dto";
import { createCertificationService } from "./../../services/certification/create.service";
import { updateCertificationService } from "./../../services/certification/update.service";
import { createEducationService } from "./../../services/education/create.service";
import { updateEducationService } from "./../../services/education/update.service";
import { createWorkExperienceService } from "./../../services/work-experience/create.service";
import { updateWorkExperienceService } from "./../../services/work-experience/update.service";
import { updateCandidateService } from "./update.service";

export async function updateCandidateProfileService(
  uuid: string,
  { personal, professional }: UpdateCandidateProfileDTO,
  file?: Express.Multer.File | undefined
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

  await updateCandidateService(
    uuid,
    {
      ...personal,
      competencyUUIDs: professional?.competencyUUIDs || [],
    },
    file
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
        candidateUUID: uuid,
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
        candidateUUID: uuid,
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
        candidateUUID: uuid,
      }));
  }
}
