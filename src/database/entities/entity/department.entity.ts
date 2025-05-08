import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity, StatusEnum, StatusType } from "../base/base.entity";
import { CandidateEntity } from "./candidate.entity";

@Entity({ name: "departments" })
export class DepartmentEntity extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: "enum", enum: StatusEnum })
  state: StatusType;

  @OneToMany(() => CandidateEntity, (candidate) => candidate.department)
  candidates: CandidateEntity[]
}
