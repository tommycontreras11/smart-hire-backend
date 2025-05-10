import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "../base/base.entity";
import { StatusEnum } from "./../../../constants";
import { CandidateEntity } from "./candidate.entity";
import { EmployeeEntity } from "./employee.entity";

@Entity({ name: "departments" })
export class DepartmentEntity extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: "enum", enum: StatusEnum, default: StatusEnum.ACTIVE })
  status: StatusEnum;

  @OneToMany(() => CandidateEntity, (candidate) => candidate.department)
  candidates: CandidateEntity[]

  @OneToMany(() => EmployeeEntity, (employee) => employee.department)
  employees: EmployeeEntity[]
}