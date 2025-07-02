import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateAcademicDisciplineDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string;
}

export class UpdateAcademicDisciplineDTO {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  description: string;
}
