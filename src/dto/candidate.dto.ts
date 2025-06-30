import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  Max,
  Min,
  Validate
} from "class-validator";
import { StatusEnum, StatusType } from "../constants";
import { PlatformType, PlatformTypeEnum } from "./../database/entities/entity/social-link.entity";
import { PartialPersonDTO, PersonDTO } from "./common.dto";

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

export class EducationCandidateDTO {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsNumber({}, { message: "Grade must be a valid number" })
  @Min(0, { message: "Grade must be at least 0" })
  @Max(100, { message: "Grade must be at most 100" })
  @Validate(({ value }: { value: any }) => Number.isInteger(value * 100), {
    message: "Grade must have at most 2 decimal places",
  })
  grade: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  start_date: Date;

  @IsOptional()
  @IsString()
  end_date: Date;

  @IsOptional()
  @IsUUID("4")
  institutionUUID: string;

  @IsNotEmpty()
  @IsUUID("4")
  candidateUUID: string;
}

export class CertificationCandidateDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  expedition_date: Date;

  @IsOptional()
  @IsString()
  expiration_date: Date;

  @IsOptional()
  @IsString()
  credential_id: string;

  @IsOptional()
  @IsString()
  credential_link: string;

  @IsNotEmpty()
  @IsUUID("4")
  institutionUUID: string;

  @IsNotEmpty()
  @IsUUID("4")
  candidateUUID: string;
}

export class SocialLinkCandidateDTO { 
  @IsNotEmpty()
  @IsEnum(PlatformTypeEnum)  
  key: PlatformType;

  @IsNotEmpty()
  @IsString()
  value: string;
}

export class UpdateCandidateDTO extends (class {} as {
  new (): PartialPersonDTO;
}) {
  @IsOptional()
  @IsNumberString()
  @Matches(/^\d{1,10}(\.\d{1,2})?$/, {
    message:
      "Desired salary must have at most 10 digits in total and 2 decimal places",
  })
  desired_salary: string;

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