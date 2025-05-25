import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "../base/base.entity";
import { StatusEnum, StatusType } from "./../../../constants";
import { CandidateEntity } from "./candidate.entity";
import { EmployeeEntity } from "./employee.entity";
import { JobPositionEntity } from "./job-position.entity";

@Entity({ name: "departments" })
export class DepartmentEntity extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: "enum", enum: StatusEnum, default: StatusEnum.ACTIVE })
  status: StatusType;

  @OneToMany(() => CandidateEntity, (candidate) => candidate.department)
  candidates: CandidateEntity[]

  @OneToMany(() => EmployeeEntity, (employee) => employee.department)
  employees: EmployeeEntity[]

  @OneToMany(() => JobPositionEntity, (jobPosition) => jobPosition.department)
  jobPositions: JobPositionEntity[];
}