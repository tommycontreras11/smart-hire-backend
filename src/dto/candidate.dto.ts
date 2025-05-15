import {
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
} from "class-validator";
import { StatusEnum, StatusType } from "../constants";

export class CreateCandidateDTO {
  @IsNotEmpty()
  @IsString()
  identification: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsNumberString()
  @Matches(/^\d{1,8}(\.\d{1,2})?$/, {
    message:
      "Desired salary must have at most 10 digits in total and 2 decimal places",
  })
  desired_salary: string;

  @IsNotEmpty()
  @IsUUID("4")
  positionUUID: string;

  @IsNotEmpty()
  @IsUUID("4")
  departmentUUID: string;
}

export class UpdateCandidateProfileDetailDTO {
  @IsOptional()
  @IsUUID("4", { each: true })
  trainingUUIDs: string[];

  @IsOptional()
  @IsUUID("4", { each: true })
  competencyUUIDs: string[];
}

export class UpdateCandidateDTO {
  @IsOptional()
  @IsString()
  identification: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  password: string;

  @IsOptional()
  @IsNumberString()
  @Matches(/^\d{1,8}(\.\d{1,2})?$/, {
    message:
      "Desired salary must have at most 10 digits in total and 2 decimal places",
  })
  desired_salary: string;

  @IsOptional()
  @IsUUID("4")
  positionUUID: string;

  @IsOptional()
  @IsUUID("4")
  departmentUUID: string;

  @IsOptional()
  @IsEnum(StatusEnum)
  status: StatusType;
}