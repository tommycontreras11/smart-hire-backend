import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsUUID
} from "class-validator";
import { StatusRequestEnum, StatusRequestType } from "../constants";

export class CreateRequestDTO {
  @IsNotEmpty()
  @IsUUID("4")
  candidateUUID: string;

  @IsNotEmpty()
  @IsUUID("4")
  jobPositionUUID: string;

  @IsNotEmpty()
  @IsUUID("4")
  recruiterUUID: string;
}

export class UpdateRequestDTO {
  @IsOptional()
  @IsUUID("4")
  candidateUUID: string;

  @IsOptional()
  @IsUUID("4")
  jobPositionUUID: string;

  @IsOptional()
  @IsUUID("4")
  recruiterUUID: string;

  @IsOptional()
  @IsEnum(StatusRequestEnum)
  status: StatusRequestType;
}
