import { UpdateCandidateProfileDTO } from "./../../dto/candidate.dto";
import { createCertificationService } from "./../../services/certification/create.service";
import { updateCertificationService } from "./../../services/certification/update.service";
import { createEducationService } from "./../../services/education/create.service";
import { updateEducationService } from "./../../services/education/update.service";
import { updateCandidateService } from "./update.service";

export async function updateCandidateProfileService(
  uuid: string,
  { personal, professional }: UpdateCandidateProfileDTO,
  file?: Express.Multer.File | undefined
) {
  await updateCandidateService(
    uuid,
    {
      ...personal,
      competencyUUIDs: professional.competencyUUIDs,
    },
    file
  );

  if (professional?.education?.uuid) {
    await updateEducationService(
      professional.education.uuid,
      professional.education
    );
  } else {
    await createEducationService({
      ...professional.education,
      candidateUUID: uuid,
    });
  }

  if (professional?.certification?.uuid) {
    await updateCertificationService(
      professional.certification.uuid,
      professional.certification
    );
  } else {
    await createCertificationService({
      ...professional.certification,
      candidateUUID: uuid,
    });
  }
}
