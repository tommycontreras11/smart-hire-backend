import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { StatusEnum, StatusType } from "../constants";

export class CreateEvaluationMethodDTO {
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class UpdateEvaluationMethodDTO {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsEnum(StatusEnum)
  status: StatusType;
}