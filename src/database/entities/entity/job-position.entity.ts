import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "../base/base.entity";
import { RequestEntity } from "./request.entity";
import { EmployeeEntity } from "./employee.entity";
import { CountryEntity } from "./country.entity";
import { LanguageEntity } from "./language.entity";
import { RecruiterEntity } from "./recruiter.entity";

export enum JobPositionRiskLevelEnum {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}

export enum JobPositionContractTypeEnum {
  FULL_TIME = "FULL_TIME",
  PART_TIME = "PART_TIME",
  CONTRACT = "CONTRACT",
}

export type JobPositionRiskLevelType = keyof typeof JobPositionRiskLevelEnum;

export type JobPositionContractType = keyof typeof JobPositionContractTypeEnum;

@Entity({ name: "job_positions" })
export class JobPositionEntity extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: "text" })
  description: string;

  @Column({ type: "float", precision: 10, scale: 2 })
  minimum_salary: number;

  @Column({ type: "float", precision: 10, scale: 2 })
  maximum_salary: string;

  @Column({ type: "enum", enum: JobPositionRiskLevelEnum })
  risk_level: JobPositionRiskLevelType;

  @Column({ type: "enum", enum: JobPositionContractTypeEnum })
  contract_type: JobPositionContractType;

  @Column()
  country_id: string;

  @Column()
  language_id: string;

  @Column()
  recruiter_id: string;

  @ManyToOne(() => CountryEntity, (country) => country.jobPositions)
  @JoinColumn({ name: "country_id", referencedColumnName: "id" })
  country: CountryEntity;
  
  @ManyToOne(() => LanguageEntity, (language) => language.jobPositions)
  @JoinColumn({ name: "language_id", referencedColumnName: "id" })
  language: LanguageEntity;
  
  @ManyToOne(() => RecruiterEntity, (recruiter) => recruiter.jobPositions)
  @JoinColumn({ name: "recruiter_id", referencedColumnName: "id" })
  recruiter: RecruiterEntity;

  @OneToMany(() => RequestEntity, (request) => request.jobPosition)
  requests: RequestEntity[];

  @OneToMany(() => EmployeeEntity, (employee) => employee.jobPosition)
  employees: EmployeeEntity[];
}
