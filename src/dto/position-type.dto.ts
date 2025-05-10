import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { StatusEnum, StatusType } from "../constants";

export class CreatePositionTypeDTO {
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class UpdatePositionTypeDTO {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsEnum(StatusEnum)
  status: StatusType;
}