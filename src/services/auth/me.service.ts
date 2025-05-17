import { statusCode } from "./../../utils/status.util";
import { CandidateEntity } from "./../../database/entities/entity/candidate.entity";
import { EmployeeEntity } from "./../../database/entities/entity/employee.entity";
import { RecruiterEntity } from "./../../database/entities/entity/recruiter.entity";
import { UserRoleEnum } from "./../../enums/user-role.enum";
import { retrieveIfUserExists } from "./../../utils/user.util";

export async function meService(userUUID: string) {
  const foundUser = await retrieveIfUserExists(null, userUUID);

  if (!foundUser)
    return Promise.reject({
      message: "Unauthorized",
      status: statusCode.UNAUTHORIZED,
    });

  const userType =
    foundUser instanceof RecruiterEntity
      ? UserRoleEnum.RECRUITER
      : foundUser instanceof EmployeeEntity
      ? UserRoleEnum.EMPLOYEE
      : foundUser instanceof CandidateEntity
      ? UserRoleEnum.CANDIDATE
      : null;

  return { user: foundUser, userType };
}
