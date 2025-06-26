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

export class CreateCandidateDTO extends PersonDTO {
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

export class UpdateCandidateDTO extends (class {} as { new (): PartialPersonDTO }) {
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
  @IsUUID("4", { each: true })
  trainingUUIDs: string[];

  @IsOptional()
  @IsUUID("4", { each: true })
  competencyUUIDs: string[];

  @IsOptional()
  @IsEnum(StatusEnum)
  status: StatusType;
}