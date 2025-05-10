import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from "class-validator";
import { StatusEnum, StatusType } from "../constants";
import {
  TrainingLevelEnum,
  TrainingLevelType,
} from "./../database/entities/entity/training.entity";

export class CreateTrainingDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsEnum(TrainingLevelEnum)
  level: TrainingLevelType;

  @IsNotEmpty()
  @IsString()
  date_from: Date;

  @IsNotEmpty()
  @IsString()
  date_to: Date;

  @IsNotEmpty()
  @IsUUID("4")
  institutionUUID: string;
}

export class UpdateTrainingDTO {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsEnum(TrainingLevelEnum)
  level: TrainingLevelType;

  @IsOptional()
  @IsString()
  date_from: Date;

  @IsOptional()
  @IsString()
  date_to: Date;

  @IsOptional()
  @IsUUID("4")
  institutionUUID: string;

  @IsOptional()
  @IsEnum(StatusEnum)
  status: StatusType;
}
