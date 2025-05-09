import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { StatusEnum, StatusType } from "../constants";

export class CreateCategoryDTO {
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class UpdateCategoryDTO {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsEnum(StatusEnum)
  status: StatusType;
}