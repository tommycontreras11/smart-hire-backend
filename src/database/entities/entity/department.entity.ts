import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "../base/base.entity";
import { CandidateEntity } from "./candidate.entity";
import { StatusEnum, StatusType } from "./../../../constants";
import { EmployeeEntity } from "./employee.entity";

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
}