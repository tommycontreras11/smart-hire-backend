export enum WorkContractTypeEnum {
  FULL_TIME = "FULL_TIME",
  PART_TIME = "PART_TIME",
  SELF_EMPLOYED = "SELF_EMPLOYED",
  FREELANCER = "FREELANCER",
  TEMPORARY_CONTRACT = "TEMPORARY CONTRACT",
  INTERNSHIP_CONTRACT = "INTERNSHIP CONTRACT",
  TRAINING_CONTRACT = "TRAINING CONTRACT",
  TEMPORARY = "TEMPORARY",
}

export enum WorkLocationTypeEnum {
  ON_SITE = "ON_SITE",
  HYBRID = "HYBRID",
  REMOTE = "REMOTE",
}

export type WorkContractType = keyof typeof WorkContractTypeEnum;

export type WorkLocationType = keyof typeof WorkLocationTypeEnum;