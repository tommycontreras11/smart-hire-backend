import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from "class-validator";
import { StatusRequestEnum, StatusRequestType } from "../constants";

export class CreateRequestDTO {
  @IsNotEmpty()
  @IsUUID("4")
  candidateUUID: string;

  @IsNotEmpty()
  @IsUUID("4")
  jobPositionUUID: string;
}

export class UpdateRequestDTO {
  @IsOptional()
  @IsUUID("4")
  candidateUUID: string;

  @IsOptional()
  @IsUUID("4")
  jobPositionUUID: string;

  @IsOptional()
  @IsString()
  nextStep: string;

  @IsOptional()
  @IsString()
  interviewDate: Date;

  @IsOptional()
  @IsEnum(StatusRequestEnum)
  status: StatusRequestType;
}
