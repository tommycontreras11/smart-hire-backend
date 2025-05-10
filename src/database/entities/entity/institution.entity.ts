import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "../base/base.entity";
import { StatusEnum, StatusType } from "./../../../constants";
import { RecruiterEntity } from "./recruiter.entity";
import { TrainingEntity } from "./training.entity";

@Entity({ name: "institutions" })
export class InstitutionEntity extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: "enum", enum: StatusEnum, default: StatusEnum.ACTIVE })
  status: StatusType;

  @OneToMany(() => TrainingEntity, (training) => training.institution)
  trainings: TrainingEntity[];

  @OneToMany(() => RecruiterEntity, (recruiter) => recruiter.institution)
  recruiters: RecruiterEntity[];
}