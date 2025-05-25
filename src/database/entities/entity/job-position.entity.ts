import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "../base/base.entity";
import { StatusEnum, StatusType } from "./../../../constants";
import { CompetencyEntity } from "./competency.entity";
import { CountryEntity } from "./country.entity";
import { LanguageEntity } from "./language.entity";
import { RecruiterEntity } from "./recruiter.entity";
import { RequestEntity } from "./request.entity";
import { DepartmentEntity } from "./department.entity";
import { PositionTypeEntity } from "./position-type.entity";

export enum JobPositionContractTypeEnum {
  FULL_TIME = "FULL_TIME",
  PART_TIME = "PART_TIME",
  CONTRACT = "CONTRACT",
  INTERN = "INTERN",
}

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
  maximum_salary: number;

  @Column({ type: "enum", enum: JobPositionContractTypeEnum })
  contract_type: JobPositionContractType;

  @Column({ type: "datetime" })
  due_date: Date;

  @Column()
  country_id: string;

  @Column()
  language_id: string;

  @Column()
  recruiter_id: string;

  @Column()
  department_id: string;

  @Column()
  position_type_id: string;

  @Column({ type: "enum", enum: StatusEnum, default: StatusEnum.ACTIVE })
  status: StatusType;

  @ManyToOne(() => CountryEntity, (country) => country.jobPositions)
  @JoinColumn({ name: "country_id", referencedColumnName: "id" })
  country: CountryEntity;
  
  @ManyToOne(() => LanguageEntity, (language) => language.jobPositions)
  @JoinColumn({ name: "language_id", referencedColumnName: "id" })
  language: LanguageEntity;
  
  @ManyToOne(() => RecruiterEntity, (recruiter) => recruiter.jobPositions)
  @JoinColumn({ name: "recruiter_id", referencedColumnName: "id" })
  recruiter: RecruiterEntity;
  
  @ManyToOne(() => DepartmentEntity, (department) => department.jobPositions)
  @JoinColumn({ name: "department_id", referencedColumnName: "id" })
  department: DepartmentEntity;

  @ManyToOne(() => PositionTypeEntity, (positionType) => positionType.jobPositions)
  @JoinColumn({ name: "position_type_id", referencedColumnName: "id" })
  positionType: PositionTypeEntity;
 
  @OneToMany(() => RequestEntity, (request) => request.jobPosition)
  requests: RequestEntity[];

  @ManyToMany(() => CompetencyEntity, (competency) => competency.jobPositions)
  @JoinTable({
    name: "job_position_competencies",
    joinColumn: {
      name: "job_position_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "competency_id",
      referencedColumnName: "id",
    },
  })
  competencies: CompetencyEntity[];
}