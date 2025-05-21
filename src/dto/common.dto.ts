import { Expose } from "class-transformer";
import { IsString, IsNotEmpty, IsUUID } from "class-validator";

export class UuidDTO {
  @IsUUID("4")
  @IsString()
  @Expose()
  @IsNotEmpty()
  uuid: string;
}

export class PersonDTO {
  @IsNotEmpty()
  @IsString()
  identification: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export type PartialPersonDTO = Partial<PersonDTO>;