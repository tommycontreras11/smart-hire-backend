import {
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  IsUUID,
  Matches
} from "class-validator";
import { StatusEnum, StatusType } from "../constants";
import {
  JobPositionContractType,
  JobPositionContractTypeEnum,
  JobPositionRiskLevelEnum,
  JobPositionRiskLevelType,
} from "./../database/entities/entity/job-position.entity";

export class CreateJobPositionDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumberString()
  @Matches(/^\d{1,8}(\.\d{1,2})?$/, {
    message:
      "Minimum salary must have at most 10 digits in total and 2 decimal places",
  })
  minimum_salary: string;

  @IsNotEmpty()
  @IsNumberString()
  @Matches(/^\d{1,8}(\.\d{1,2})?$/, {
    message:
      "Maximum salary must have at most 10 digits in total and 2 decimal places",
  })
  maximum_salary: string;

  @IsNotEmpty()
  @IsEnum(JobPositionRiskLevelEnum)
  risk_level: JobPositionRiskLevelType;

  @IsNotEmpty()
  @IsEnum(JobPositionContractTypeEnum)
  contract_type: JobPositionContractType;

  @IsNotEmpty()
  @IsUUID("4")
  countryUUID: string;

  @IsNotEmpty()
  @IsUUID("4")
  languageUUID: string;

  @IsNotEmpty()
  @IsUUID("4")
  recruiterUUID: string;
}

export class UpdateJobPositionDTO {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsNumberString()
  @Matches(/^\d{1,8}(\.\d{1,2})?$/, {
    message:
      "Minimum salary must have at most 10 digits in total and 2 decimal places",
  })
  minimum_salary: string;

  @IsOptional()
  @IsNumberString()
  @Matches(/^\d{1,8}(\.\d{1,2})?$/, {
    message:
      "Maximum salary must have at most 10 digits in total and 2 decimal places",
  })
  maximum_salary: string;

  @IsOptional()
  @IsEnum(JobPositionRiskLevelEnum)
  risk_level: JobPositionRiskLevelType;

  @IsOptional()
  @IsEnum(JobPositionContractTypeEnum)
  contract_type: JobPositionContractType;

  @IsOptional()
  @IsUUID("4")
  countryUUID: string;

  @IsOptional()
  @IsUUID("4")
  languageUUID: string;

  @IsOptional()
  @IsUUID("4")
  recruiterUUID: string;

  @IsOptional()
  @IsEnum(StatusEnum)
  status: StatusType;
}