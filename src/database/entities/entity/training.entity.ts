import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity, StatusEnum, StatusType } from "../base/base.entity";
import { CandidateEntity } from "./candidate.entity";

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
  institution: string;

  @Column({ type: "enum", enum: StatusEnum })
  state: StatusType;

  @OneToMany(() => CandidateEntity, (candidate) => candidate.trainings)
  candidates: CandidateEntity[];
}
