import { IsNotEmpty, IsString } from "class-validator";

export class SignInDTO {
  @IsNotEmpty()
  @IsString()
  identification: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}