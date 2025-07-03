import {
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  IsUUID,
  Matches
} from "class-validator";
import { StatusEnum, StatusType } from "../constants";
import { PlatformType, PlatformTypeEnum } from "./../database/entities/entity/social-link.entity";
import { PersonDTO } from "./common.dto";

export class CreateCandidateDTO extends PersonDTO {
  @IsNotEmpty()
  @IsNumberString()
  @Matches(/^\d{1,10}(\.\d{1,2})?$/, {
    message:
      "Desired salary must have at most 10 digits in total and 2 decimal places",
  })
  desired_salary: string;

  @IsNotEmpty()
  @IsUUID("4")
  positionUUID: string;

  @IsNotEmpty()
  @IsUUID("4")
  departmentUUID: string;
}

export class SocialLinkCandidateDTO { 
  @IsNotEmpty()
  @IsEnum(PlatformTypeEnum)  
  key: PlatformType;

  @IsNotEmpty()
  @IsString()
  value: string;
}

export class UpdateCandidateDTO extends CreateCandidateDTO implements Partial<CreateCandidateDTO> {
  @IsOptional()
  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  location: string;

  @IsOptional()
  @IsString()
  bio: string;

  @IsOptional()
  social_links: SocialLinkCandidateDTO[];

  @IsOptional()
  @IsUUID("4", { each: true })
  competencyUUIDs: string[];

  @IsOptional()
  @IsEnum(StatusEnum)
  status: StatusType;
}