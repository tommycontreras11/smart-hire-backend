import { Not } from "typeorm";
import { CandidateEntity } from "../../database/entities/entity/candidate.entity";
import { UpdateCandidateDTO } from "../../dto/candidate.dto";
import { statusCode } from "../../utils/status.util";
import { DepartmentEntity } from "./../../database/entities/entity/department.entity";
import { PositionTypeEntity } from "./../../database/entities/entity/position-type.entity";
import { hashPassword } from "./../../utils/common.util";

export async function updateCandidateService(
  uuid: string,
  {
    identification,
    name,
    password,
    desired_salary,
    positionUUID,
    departmentUUID,
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

  foundCandidate.identification =
    identification ?? foundCandidate.identification;
  foundCandidate.name = name ?? foundCandidate.name;
  foundCandidate.password = password ? hashPassword(password) : foundCandidate.password;
  foundCandidate.desired_salary =
    parseFloat(desired_salary) ?? foundCandidate.desired_salary;
  foundCandidate.desiredPosition =
    foundPositionType ?? foundCandidate.desiredPosition;
  foundCandidate.department = foundDepartment ?? foundCandidate.department;
  foundCandidate.status = status ?? foundCandidate.status;

  await foundCandidate.save().catch((e) => {
    console.error("updateCandidateService -> CandidateEntity.update: ", e);
    return null;
  });

  return "Candidate updated successfully";
}