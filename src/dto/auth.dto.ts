import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { CreateCandidateDTO } from "./candidate.dto";
import { CreateRecruiterDTO } from "./recruiter.dto";
import { CreateEmployeeDTO } from "./employee.dto";
import { UserRoleEnum } from "./../enums/user-role.enum";

export class SignInDTO {
  @IsNotEmpty()
  @IsString()
  identification: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class SignUpDTO {
  @IsNotEmpty()
  user: CreateCandidateDTO | CreateRecruiterDTO | CreateEmployeeDTO;

  @IsNotEmpty()
  @IsEnum(UserRoleEnum)
  type: UserRoleEnum;
}