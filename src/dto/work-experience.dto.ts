import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID
} from "class-validator";
import {
  WorkContractType,
  WorkContractTypeEnum,
  WorkLocationType,
  WorkLocationTypeEnum,
} from "./../enums/work.enum";

export class CreateWorkExperienceDTO {
  @IsOptional()
  @IsString()
  uuid: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  date_from: Date;

  @IsNotEmpty()
  @IsString()
  date_to: Date;

  @IsOptional()
  @IsString()
  location: string;

  @IsOptional()
  @IsEnum(WorkContractTypeEnum)
  work_type: WorkContractType;

  @IsOptional()
  @IsEnum(WorkLocationTypeEnum)
  work_location: WorkLocationType;

  @IsNotEmpty()
  @IsBoolean()
  current_position: boolean;

  @IsNotEmpty()
  @IsUUID("4")
  positionUUID: string;

  @IsNotEmpty()
  @IsUUID("4")
  institutionUUID: string;

  @IsOptional()
  @IsUUID("4")
  jobSourceUUID: string;

  @IsOptional()
  @IsUUID("4", { each: true })
  competencyUUIDs: string[];
}

export class UpdateWorkExperienceDTO
  extends CreateWorkExperienceDTO
  implements Partial<CreateWorkExperienceDTO> {}
