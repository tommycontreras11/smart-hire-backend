import { CandidateEntity } from "./../../database/entities/entity/candidate.entity";
import { CompetencyEntity } from "./../../database/entities/entity/competency.entity";
import { TrainingEntity } from "./../../database/entities/entity/training.entity";
import { ModifyProfileDetailDTO } from "./../../dto/candidate.dto";
import { In } from "typeorm";
import { statusCode } from "./../../utils/status.util";

export async function modifyProfileDetailService(uuid: string, { trainingUUIDs, competencyUUIDs,  }: ModifyProfileDetailDTO) {
  const foundCandidate = await CandidateEntity.findOneBy({ uuid }).catch((e) => {
    console.error("updateCandidateService -> CandidateEntity.findOneBy: ", e);
    return null;
  })

  if (!foundCandidate) {
    return Promise.reject({
      message: "Candidate not found",
      status: statusCode.NOT_FOUND,
    });
  }

  let foundTraining: TrainingEntity[] | null = [];
  if (trainingUUIDs?.length > 0) {
    foundTraining = await TrainingEntity.find({
      where: {
        uuid: In(trainingUUIDs),
      },
    }).catch((e) => {
      console.error("updateCandidateService -> TrainingEntity.findOneBy: ", e);
      return null;
    });

    if (!foundTraining || foundTraining.length !== trainingUUIDs.length) {
      return Promise.reject({
        message: "Training not found",
        status: statusCode.NOT_FOUND,
      });
    }
  }
  let foundCompetencies: CompetencyEntity[] | null = [];
  if (competencyUUIDs?.length > 0) {
    foundCompetencies = await CompetencyEntity.find({
      where: {
        uuid: In(competencyUUIDs),
      },
    }).catch((e) => {
      console.error(
        "updateCandidateService -> CompetencyEntity.findOneBy: ",
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

  foundCandidate.training = foundTraining;
  foundCandidate.competencies = foundCompetencies;

  await foundCandidate.save().catch((e) => {
    console.error("updateCandidateService -> CandidateEntity.update: ", e);
    return null;
  });

  return "Candidate profile updated successfully";
}