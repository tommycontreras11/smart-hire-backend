import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity, StatusEnum, StatusType } from "../base/base.entity";
import { CandidateEntity } from "./candidate.entity";
import { InstitutionEntity } from "./institution.entity";

export enum TrainingLevelEnum {
  BACHELORS = "BACHELOR'S DEGREE",
  POSTGRADUATE = "POSTGRADUATE",
  MASTERS = "MASTER’S DEGREE",
  DOCTORATE = "DOCTORATE",
  TECHNICAL = "TECHNICAL",
  MANAGEMENT = "MANAGEMENT",
}

export type TrainingLevelType = keyof typeof TrainingLevelEnum;

@Entity({ name: "training" })
export class TrainingEntity extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: "text" })
  description: string;

  @Column({ type: "enum", enum: TrainingLevelEnum })
  level: TrainingLevelType;

  @Column({ type: "date" })
  date_from: Date;

  @Column({ type: "date" })
  date_to: Date;

  @Column()
  institution_id: number;

  @Column({ type: "enum", enum: StatusEnum, default: StatusEnum.ACTIVE })
  status: StatusType;

  @ManyToOne(() => InstitutionEntity, (institution) => institution.trainings)
  @JoinColumn({ name: "institution_id", referencedColumnName: "id" })
  institution: InstitutionEntity;

  @OneToMany(() => CandidateEntity, (candidate) => candidate.trainings)
  candidates: CandidateEntity[];
}
