import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from "class-validator";
import { StatusEnum, StatusType } from "../constants";
import {
  LevelCompetencyEnum,
  LevelCompetencyType,
} from "./../database/entities/entity/competency.entity";

export class CreateCompetencyDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsUUID("4")
  categoryUUID: string;

  @IsNotEmpty()
  @IsEnum(LevelCompetencyEnum)
  level: LevelCompetencyType;

  @IsNotEmpty()
  @IsUUID("4", { each: true })
  evaluationMethodUUIDs: string[];

  @IsNotEmpty()
  @IsUUID("4", { each: true })
  positionTypeUUIDs: string[];
}

export class UpdateCompetencyDTO {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsUUID("4")
  categoryUUID: string;

  @IsOptional()
  @IsEnum(LevelCompetencyEnum)
  level: LevelCompetencyType;

  @IsOptional()
  @IsUUID("4", { each: true })
  evaluationMethodUUIDs: string[];

  @IsOptional()
  @IsUUID("4", { each: true })
  positionTypeUUIDs: string[];

  @IsOptional()
  @IsEnum(StatusEnum)
  status: StatusType;
}