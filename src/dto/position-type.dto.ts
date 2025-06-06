import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";
import { StatusEnum, StatusType } from "../constants";

export class CreatePositionTypeDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsUUID('4')
  @IsNotEmpty()
  departmentUUID: string
}

export class UpdatePositionTypeDTO {
  @IsOptional()
  @IsString()
  name: string;

  @IsUUID('4')
  @IsOptional()
  departmentUUID: string

  @IsOptional()
  @IsEnum(StatusEnum)
  status: StatusType;
}