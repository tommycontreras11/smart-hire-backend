import { CompetencyEntity } from "./../../database/entities/entity/competency.entity";
import { CandidateEntity } from "./../../database/entities/entity/candidate.entity";
import { ProfessionalCandidateDTO } from "./../../dto/candidate.dto";
import { In } from "typeorm";
import { statusCode } from "./../../utils/status.util";
import { createEducationService } from "./../../services/education/create.service";
import { updateEducationService } from "./../../services/education/update.service";

export async function updateCandidateProfessionalService(
  uuid: string,
  { competencyUUIDs, education }: ProfessionalCandidateDTO
) {
  const foundCandidate = await CandidateEntity.findOneBy({ uuid }).catch(
    (e) => {
      console.error(
        "updateCandidateProfessionalService -> CandidateEntity.findOneBy: ",
        e
      );
      return null;
    }
  );

  if (!foundCandidate) {
    return Promise.reject({
      message: "Candidate not found",
      status: statusCode.NOT_FOUND,
    });
  }

  if (education.editMode && education.uuid) {
    await updateEducationService(education);
} else {
    await createEducationService({ candidate: foundCandidate, ...education });
  }

  let foundCompetencies: CompetencyEntity[] | null = [];
  if (competencyUUIDs?.length > 0) {
    foundCompetencies = await CompetencyEntity.find({
      where: {
        uuid: In(competencyUUIDs),
      },
    }).catch((e) => {
      console.error(
        "updateProfileDetailService -> CompetencyEntity.findOneBy: ",
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
}
