import { DepartmentEntity } from "./../../database/entities/entity/department.entity";
import { PositionTypeEntity } from "./../../database/entities/entity/position-type.entity";
import { WorkExperienceEntity } from "./../../database/entities/entity/work-experience.entity";
import { updateWorkExperienceService } from "./../../services/work-experience/update.service";
import { In, Not } from "typeorm";
import { hashPassword } from "./../../utils/common.util";
import { CandidateEntity } from "../../database/entities/entity/candidate.entity";
import { UpdateCandidateDTO } from "../../dto/candidate.dto";
import { statusCode } from "../../utils/status.util";
import { TrainingEntity } from "./../../database/entities/entity/training.entity";
import { CompetencyEntity } from "./../../database/entities/entity/competency.entity";

export async function updateCandidateService(
  uuid: string,
  {
    identification,
    name,
    password,
    desired_salary,
    positionUUID,
    departmentUUID,
    trainingUUIDs,
    competencyUUIDs,
    workExperience,
    recommendBy,
    status,
  }: UpdateCandidateDTO
) {
  // file?: Express.Multer.File | undefined
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

  let foundPositionType: PositionTypeEntity | null = null;
  if (positionUUID) {
    foundPositionType = await PositionTypeEntity.findOneBy({
      uuid: positionUUID,
    }).catch((e) => {
      console.error(
        "updateCandidateService -> PositionTypeEntity.findOneBy: ",
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
  }

  let foundDepartment: DepartmentEntity | null = null;
  if (departmentUUID) {
    foundDepartment = await DepartmentEntity.findOneBy({
      uuid: departmentUUID,
    }).catch((e) => {
      console.error(
        "updateCandidateService -> DepartmentEntity.findOneBy: ",
        e
      );
      return null;
    });

    if (!foundDepartment) {
      return Promise.reject({
        message: "Department not found",
        status: statusCode.NOT_FOUND,
      });
    }
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

  let workExperienceUpdated: WorkExperienceEntity | null = null;
  if (
    Object.values(workExperience).some((v) => v !== null && v !== undefined)
  ) {
    workExperienceUpdated = await updateWorkExperienceService(
      foundCandidate.workExperience.uuid,
      workExperience
    );

    if (!workExperienceUpdated) {
      return Promise.reject({
        message: "Work experience not updated",
        status: statusCode.BAD_REQUEST,
      });
    }
  }

  foundCandidate.identification =
    identification ?? foundCandidate.identification;
  foundCandidate.name = name ?? foundCandidate.name;
  foundCandidate.password = hashPassword(password) ?? foundCandidate.password;
  foundCandidate.desired_salary =
    parseFloat(desired_salary) ?? foundCandidate.desired_salary;
  foundCandidate.desiredPosition =
    foundPositionType ?? foundCandidate.desiredPosition;
  foundCandidate.department = foundDepartment ?? foundCandidate.department;
  foundCandidate.training = foundTraining;
  foundCandidate.competencies = foundCompetencies;
  foundCandidate.workExperience =
    workExperienceUpdated ?? foundCandidate.workExperience;
  foundCandidate.recommend_by = recommendBy ?? foundCandidate.recommend_by;
  foundCandidate.status = status ?? foundCandidate.status;

  await foundCandidate.save().catch((e) => {
    console.error("updateCandidateService -> CandidateEntity.update: ", e);
    return null;
  });

  return "Candidate updated successfully";
}