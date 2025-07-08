import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateCertificationDTO {
  @IsOptional()
  @IsUUID("4")
  uuid: string

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
}

export class UpdateCertificationDTO
  extends CreateCertificationDTO
  implements Partial<CreateCertificationDTO> {}
