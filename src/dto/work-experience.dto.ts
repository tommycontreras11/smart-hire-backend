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

export class CreateWorkExperienceDTO {
  @IsNotEmpty()
  @IsString()
  company: string;

  @IsNotEmpty()
  @IsString()
  date_from: Date;

  @IsNotEmpty()
  @IsString()
  date_to: Date;

  @IsNotEmpty()
  @IsNumberString()
  @Matches(/^\d{1,8}(\.\d{1,2})?$/, {
    message:
      "Salary must have at most 10 digits in total and 2 decimal places",
  })
  salary: string;

  @IsOptional()
  @IsString()
  recommendBy: string;

  @IsNotEmpty()
  @IsUUID("4")
  positionUUID: string;

  @IsNotEmpty()
  @IsUUID("4")
  candidateUUID: string;
}

export class UpdateWorkExperienceDTO {
  @IsOptional()
  @IsString()
  company: string;

  @IsOptional()
  @IsString()
  date_from: Date;

  @IsOptional()
  @IsString()
  date_to: Date;

  @IsOptional()
  @IsNumberString()
  @Matches(/^\d{1,8}(\.\d{1,2})?$/, {
    message:
      "Maximum salary must have at most 10 digits in total and 2 decimal places",
  })
  salary: string;

  @IsOptional()
  @IsString()
  recommendBy: string;

  @IsOptional()
  @IsUUID("4")
  positionUUID: string;

  @IsOptional()
  @IsUUID("4")
  candidateUUID: string;

  @IsOptional()
  @IsEnum(StatusEnum)
  status: StatusType;
}