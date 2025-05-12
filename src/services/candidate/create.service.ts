import { PositionTypeEntity } from "./../../database/entities/entity/position-type.entity";
import { CandidateEntity } from "../../database/entities/entity/candidate.entity";
import { CreateCandidateDTO } from "../../dto/candidate.dto";
import { statusCode } from "../../utils/status.util";
import { createWorkExperienceService } from "./../../services/work-experience/create.service";
import { hashPassword } from "./../../utils/common.util";
import { DepartmentEntity } from "./../../database/entities/entity/department.entity";
import { In } from "typeorm";
import { CompetencyEntity } from "./../../database/entities/entity/competency.entity";
import { TrainingEntity } from "./../../database/entities/entity/training.entity";

export async function createCandidateService(
  {
    identification,
    password,
    desired_salary,
    positionUUID,
    departmentUUID,
    trainingUUIDs, 
    competencyUUIDs,
    workExperience,
    recommendBy,
    ...payload
  }: CreateCandidateDTO,
  // file?: Express.Multer.File | undefined
) {
  const foundCandidate = await CandidateEntity.findOneBy({
    identification,
  }).catch((e) => {
    console.error("createCandidateService -> CandidateEntity.findOneBy: ", e);
    return null;
  });

  if (foundCandidate) {
    return Promise.reject({
      message: "Candidate's identification already exists",
      status: statusCode.BAD_REQUEST,
    });
  }

  const foundPositionType = await PositionTypeEntity.findOneBy({
    uuid: positionUUID,
  }).catch((e) => {
    console.error("createCandidateService -> PositionTypeEntity.findOneBy: ", e);
    return null;
  });

  if (!foundPositionType) {
    return Promise.reject({
      message: "Job position not found",
      status: statusCode.NOT_FOUND,
    });
  }

  const foundDepartment = await DepartmentEntity.findOneBy({
    uuid: departmentUUID,
  }).catch((e) => {
    console.error("createCandidateService -> DepartmentEntity.findOneBy: ", e);
    return null;
  });

  if (!foundDepartment) {
    return Promise.reject({
      message: "Department not found",
      status: statusCode.NOT_FOUND,
    });
  }

  const foundTraining = await TrainingEntity.find({
    where: {
      uuid: In(trainingUUIDs)
    },
  }).catch((e) => {
    console.error("createCandidateService -> TrainingEntity.findOneBy: ", e);
    return null;
  });

  if(!foundTraining || foundTraining.length !== trainingUUIDs.length) {
    return Promise.reject({
      message: "Training not found",
      status: statusCode.NOT_FOUND,
    });
  }

  const foundCompetencies = await CompetencyEntity.find({
    where: {
      uuid: In(competencyUUIDs)
    },
  }).catch((e) => {
    console.error("createCandidateService -> CompetencyEntity.findOneBy: ", e);
    return null;
  });

  if(!foundCompetencies || foundCompetencies.length !== competencyUUIDs.length) {
    return Promise.reject({
      message: "Competencies not found",
      status: statusCode.NOT_FOUND,
    });
  }

  const workExperienceSaved = await createWorkExperienceService(
    workExperience
  ).catch((e) => {
    console.error("createCandidateService -> createWorkExperienceService: ", e);
    return null;
  });

  if (!workExperienceSaved) {
    return Promise.reject({
      message: "Work experience not created",
      status: statusCode.BAD_REQUEST,
    });
  }

  await CandidateEntity.create({
    identification,
    password: hashPassword(password),
    desired_salary: parseFloat(desired_salary),
    desiredPosition: foundPositionType,
    department: foundDepartment,
    workExperience: workExperienceSaved,
    training: foundTraining,
    competencies: foundCompetencies,
    file_name: "s",
    recommend_by: recommendBy,
    ...payload,
  })
    .save()
    .catch((e) => {
      console.error("createCandidateService -> CandidateEntity.create: ", e);
      return null;
    });

  return "Candidate created successfully";
}
