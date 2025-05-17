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

export class CreateEmployeeDTO {
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
      "Monthly salary must have at most 10 digits in total and 2 decimal places",
  })
  monthly_salary: string;

  @IsNotEmpty()
  @IsString()
  entry_date: Date;

  @IsNotEmpty()
  @IsUUID("4")
  departmentUUID: string;

  @IsNotEmpty()
  @IsUUID("4")
  jobPositionUUID: string;
}

export class UpdateEmployeeDTO {
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
      "Monthly salary must have at most 10 digits in total and 2 decimal places",
  })
  monthly_salary: string;

  @IsOptional()
  @IsString()
  entry_date: Date;

  @IsOptional()
  @IsUUID("4")
  departmentUUID: string;

  @IsOptional()
  @IsUUID("4")
  jobPositionUUID: string;

  @IsOptional()
  @IsEnum(StatusEnum)
  status: StatusType;
}