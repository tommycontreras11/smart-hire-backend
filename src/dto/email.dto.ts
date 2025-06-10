import { IsNotEmpty, IsString } from "class-validator";

export class SendInterviewEmailDTO {
  @IsNotEmpty()
  @IsString()
  requestUUID: string;
  
  @IsNotEmpty()
  @IsString()
  candidateName: string;

  @IsNotEmpty()
  @IsString()
  interviewDate: string;

  @IsNotEmpty()
  @IsString()
  interviewTime: string;

  @IsNotEmpty()
  @IsString()
  interviewerName: string;

  @IsNotEmpty()
  @IsString()
  interviewLink: string;

  @IsNotEmpty()
  @IsString()
  to: string;
}

export class SendHiredEmailDTO {
  @IsNotEmpty()
  @IsString()
  requestUUID: string;

  @IsNotEmpty()
  @IsString()
  candidateName: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  positionTitle: string;

  @IsNotEmpty()
  @IsString()
  startDate: string;

  @IsNotEmpty()
  @IsString()
  hrContactName: string;

  @IsNotEmpty()
  @IsString()
  hrContactEmail: string;

  @IsNotEmpty()
  @IsString()
  offerLink: string;
}
