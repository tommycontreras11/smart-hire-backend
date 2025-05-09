import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { StatusEnum, StatusType } from "../constants";

export class CreateLanguageDTO {
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class UpdateLanguageDTO {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsEnum(StatusEnum)
  status: StatusType;
}