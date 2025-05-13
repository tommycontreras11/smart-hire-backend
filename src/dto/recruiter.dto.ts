import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString
} from "class-validator";
import { StatusEnum, StatusType } from "../constants";

export class CreateRecruiterDTO {
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
  @IsString()
  institution: string;
}

export class UpdateRecruiterDTO {
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
  @IsString()
  institution: string;

  @IsOptional()
  @IsEnum(StatusEnum)
  status: StatusType;
}
