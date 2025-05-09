import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity, StatusEnum, StatusType } from "../base/base.entity";
import { RecruiterEntity } from "./recruiter.entity";
import { TrainingEntity } from "./training.entity";

@Entity({ name: "institution" })
export class InstitutionEntity extends BaseEntity {
  @Column({ length: 100 })
  name: string;

  @Column({ type: "enum", enum: StatusEnum, default: StatusEnum.ACTIVE })
  status: StatusType;

  @OneToMany(() => TrainingEntity, (training) => training.institution)
  trainings: TrainingEntity[];

  @OneToMany(() => RecruiterEntity, (recruiter) => recruiter.institution)
  recruiters: RecruiterEntity[];
}
