import {
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
  Validate
} from "class-validator";

export class CreateEducationDTO {
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

  @IsOptional()
  @IsUUID("4")
  academicDisciplineUUID: string;
}

export class UpdateEducationDTO
  extends CreateEducationDTO
  implements Partial<CreateEducationDTO> {}
