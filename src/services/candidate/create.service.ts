import { CandidateEntity } from "../../database/entities/entity/candidate.entity";
import { CreateCandidateDTO } from "../../dto/candidate.dto";
import { statusCode } from "../../utils/status.util";
import { DepartmentEntity } from "./../../database/entities/entity/department.entity";
import { PositionTypeEntity } from "./../../database/entities/entity/position-type.entity";
import { hashPassword } from "./../../utils/common.util";
import { validateProperty } from "./../../utils/user.util";

export async function createCandidateService({
  identification,
  email,
  password,
  desired_salary,
  positionUUID,
  departmentUUID,
  ...payload
}: CreateCandidateDTO) {
  // file?: Express.Multer.File | undefined
  await validateProperty<CandidateEntity>(
    CandidateEntity,
    identification,
    "Identification"
  );

  await validateProperty<CandidateEntity>(CandidateEntity, email, "Email");

  const foundDepartment = await DepartmentEntity.findOneBy({ uuid: departmentUUID ,
  }).catch((e) => {
    console.error("createCandidateService -> DepartmentEntity.findOne: ", e);
    return null;
  });

  if (!foundDepartment) {
    return Promise.reject({
      message: "Department not found",
      status: statusCode.NOT_FOUND,
    });
  }

  const foundPositionType = await PositionTypeEntity.findOne({
    relations: { department: true },
    where: { uuid: positionUUID },
  }).catch((e) => {
    console.error(
      "createCandidateService -> PositionTypeEntity.findOneBy: ",
      e
    );
    return null;
  });

  if (!foundPositionType) {
    return Promise.reject({
      message: "Position type not found",
      status: statusCode.NOT_FOUND,
    });
  }

  if (foundPositionType.department.uuid !== foundDepartment.uuid)
    return Promise.reject({
      message: "Position type and department not match",
      status: statusCode.BAD_REQUEST,
    });

  await CandidateEntity.create({
    identification,
    email,
    password: hashPassword(password),
    desired_salary: parseFloat(desired_salary),
    desiredPosition: foundPositionType,
    department: foundDepartment,
    file_name: "s",
    ...payload,
  })
    .save()
    .catch((e) => {
      console.error("createCandidateService -> CandidateEntity.create: ", e);
      return null;
    });

  return "Candidate created successfully";
}
