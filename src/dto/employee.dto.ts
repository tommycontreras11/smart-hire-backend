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
import { PartialPersonDTO, PersonDTO } from "./common.dto";

export class CreateEmployeeDTO extends PersonDTO {
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
  positionTypeUUID: string;
}

export class UpdateEmployeeDTO extends (class {} as { new (): PartialPersonDTO }) {
  @IsOptional()
  @IsNumberString()
  @Matches(/^\d{1,10}(\.\d{1,2})?$/, {
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
  positionTypeUUID: string;

  @IsOptional()
  @IsEnum(StatusEnum)
  status: StatusType;
}