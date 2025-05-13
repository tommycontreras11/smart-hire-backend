import { In } from "typeorm";
import { CandidateEntity } from "../../database/entities/entity/candidate.entity";
import { CreateCandidateDTO } from "../../dto/candidate.dto";
import { statusCode } from "../../utils/status.util";
import { CompetencyEntity } from "./../../database/entities/entity/competency.entity";
import { DepartmentEntity } from "./../../database/entities/entity/department.entity";
import { PositionTypeEntity } from "./../../database/entities/entity/position-type.entity";
import { TrainingEntity } from "./../../database/entities/entity/training.entity";
import { createWorkExperienceService } from "./../../services/work-experience/create.service";
import { hashPassword } from "./../../utils/common.util";
import {
  validateIdentification
} from "./../../utils/user.util";

export async function createCandidateService({
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
}: CreateCandidateDTO) {
  // file?: Express.Multer.File | undefined
  await validateIdentification<CandidateEntity>(
    CandidateEntity,
    identification
  );

  const foundPositionType = await PositionTypeEntity.findOneBy({
    uuid: positionUUID,
  }).catch((e) => {
    console.error(
      "createCandidateService -> PositionTypeEntity.findOneBy: ",
      e
    );
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
      uuid: In(trainingUUIDs),
    },
  }).catch((e) => {
    console.error("createCandidateService -> TrainingEntity.findOneBy: ", e);
    return null;
  });

  if (!foundTraining || foundTraining.length !== trainingUUIDs.length) {
    return Promise.reject({
      message: "Training not found",
      status: statusCode.NOT_FOUND,
    });
  }

  const foundCompetencies = await CompetencyEntity.find({
    where: {
      uuid: In(competencyUUIDs),
    },
  }).catch((e) => {
    console.error("createCandidateService -> CompetencyEntity.findOneBy: ", e);
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
