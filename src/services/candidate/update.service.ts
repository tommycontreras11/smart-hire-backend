import { In, Not } from "typeorm";
import { CandidateEntity } from "../../database/entities/entity/candidate.entity";
import { UpdateCandidateDTO } from "../../dto/candidate.dto";
import { statusCode } from "../../utils/status.util";
import { DepartmentEntity } from "./../../database/entities/entity/department.entity";
import { PositionTypeEntity } from "./../../database/entities/entity/position-type.entity";
import { TrainingEntity } from "./../../database/entities/entity/training.entity";
import { hashPassword } from "./../../utils/common.util";
import { uploadFile } from "./../../utils/upload.util";

export async function updateCandidateService(
  uuid: string,
  {
    identification,
    name,
    email,
    password,
    desired_salary,
    status,
  }: UpdateCandidateDTO,
  file?: Express.Multer.File | undefined
) {
  const foundCandidate = await CandidateEntity.findOne({
    where: { uuid },
    relations: {
      workExperience: true,
    },
  }).catch((e) => {
    console.error("updateCandidateService -> CandidateEntity.findOneBy: ", e);
    return null;
  });

  if (!foundCandidate) {
    return Promise.reject({
      message: "Candidate not found",
      status: statusCode.NOT_FOUND,
    });
  }

  if (identification) {
    const existingCandidate = await CandidateEntity.findOne({
      where: { identification, uuid: Not(uuid) },
    }).catch((e) => {
      console.error("updateCandidateService -> CandidateEntity.findOneBy: ", e);
      return null;
    });

    if (existingCandidate) {
      return Promise.reject({
        message: "Candidate's identification already exists",
        status: statusCode.BAD_REQUEST,
      });
    }
  }

    // let foundTraining: TrainingEntity[] | null = [];
    // if (trainingUUIDs?.length > 0) {
    //   foundTraining = await TrainingEntity.find({
    //     where: {
    //       uuid: In(trainingUUIDs),
    //     },
    //   }).catch((e) => {
    //     console.error(
    //       "updateProfileDetailService -> TrainingEntity.findOneBy: ",
    //       e
    //     );
    //     return null;
    //   });
  
    //   if (!foundTraining || foundTraining.length !== trainingUUIDs.length) {
    //     return Promise.reject({
    //       message: "Training not found",
    //       status: statusCode.NOT_FOUND,
    //     });
    //   }
    // }
    // let foundCompetencies: CompetencyEntity[] | null = [];
    // if (competencyUUIDs?.length > 0) {
    //   foundCompetencies = await CompetencyEntity.find({
    //     where: {
    //       uuid: In(competencyUUIDs),
    //     },
    //   }).catch((e) => {
    //     console.error(
    //       "updateProfileDetailService -> CompetencyEntity.findOneBy: ",
    //       e
    //     );
    //     return null;
    //   });
  
    //   if (
    //     !foundCompetencies ||
    //     foundCompetencies.length !== competencyUUIDs.length
    //   ) {
    //     return Promise.reject({
    //       message: "Competencies not found",
    //       status: statusCode.NOT_FOUND,
    //     });
    //   }
    // }

  foundCandidate.identification =
    identification ?? foundCandidate.identification;
  foundCandidate.name = name ?? foundCandidate.name;
  foundCandidate.email = email ?? foundCandidate.email;
  foundCandidate.password = password
    ? hashPassword(password)
    : foundCandidate.password;
  foundCandidate.desired_salary =
    parseFloat(desired_salary) ?? foundCandidate.desired_salary;
  foundCandidate.status = status ?? foundCandidate.status;
  // foundCandidate.training = foundTraining ?? foundCandidate.training;

  if(file) foundCandidate.curriculum = await uploadFile<CandidateEntity>(foundCandidate, file);

  await foundCandidate.save().catch((e) => {
    console.error("updateCandidateService -> CandidateEntity.update: ", e);
    return null;
  });

  return "Candidate updated successfully";
}
