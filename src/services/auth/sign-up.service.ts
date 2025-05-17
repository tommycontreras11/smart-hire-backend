import { UserRoleEnum } from "./../../enums/user-role.enum";
import { SignUpDTO } from "./../../dto/auth.dto";
import { createRecruiterService } from "./../../services/recruiter/create.service";
import { createCandidateService } from "./../../services/candidate/create.service";
import { createEmployeeService } from "./../../services/employee/create.service";
import { CreateRecruiterDTO } from "./../../dto/recruiter.dto";
import { CreateCandidateDTO } from "./../../dto/candidate.dto";
import { CreateEmployeeDTO } from "./../../dto/employee.dto";

export async function signUpService({ user, type }: SignUpDTO) {
  const creator = createUserStrategyMap[type];
  if (!creator) throw new Error("Invalid user role");

  return await creator(user);
}

const createUserStrategyMap: Record<UserRoleEnum, (user: any) => Promise<any>> = {
  [UserRoleEnum.RECRUITER]: (user) => createRecruiterService(user as CreateRecruiterDTO),
  [UserRoleEnum.CANDIDATE]: (user) => createCandidateService(user as CreateCandidateDTO),
  [UserRoleEnum.EMPLOYEE]: (user) => createEmployeeService(user as CreateEmployeeDTO),
};