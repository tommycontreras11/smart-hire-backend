import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { StatusEnum, StatusType } from "./../constants";

export class CreateCountryDTO {
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class UpdateCountryDTO {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsEnum(StatusEnum)
  status: StatusType;
}