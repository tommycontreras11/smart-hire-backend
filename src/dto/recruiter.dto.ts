import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString
} from "class-validator";
import { StatusEnum, StatusType } from "../constants";
import { PartialPersonDTO, PersonDTO } from "./common.dto";

export class CreateRecruiterDTO extends PersonDTO {
  @IsNotEmpty()
  @IsString()
  institution: string;
}

export class UpdateRecruiterDTO extends (class {} as { new (): PartialPersonDTO }) {
  @IsOptional()
  @IsString()
  institution: string;

  @IsOptional()
  @IsEnum(StatusEnum)
  status: StatusType;
}
