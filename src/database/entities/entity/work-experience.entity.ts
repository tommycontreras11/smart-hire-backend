import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { BaseEntity } from "../base/base.entity";
import { StatusEnum, StatusType } from "./../../../constants";
import { CandidateEntity } from "./candidate.entity";
import { PositionTypeEntity } from "./position-type.entity";

@Entity({ name: "work_experiences" })
export class WorkExperienceEntity extends BaseEntity {
  @Column()
  company: string;

  @Column({ type: "date" })
  date_from: Date;

  @Column({ type: "date" })
  date_to: Date;

  @Column({ type: "float", precision: 10, scale: 2 })
  salary: number;

  @Column({ nullable: true })
  recommend_by: string;

  @Column()
  position_id: number;

  @Column()
  candidate_id: number;

  @Column({ type: "enum", enum: StatusEnum, default: StatusEnum.ACTIVE })
  status: StatusType;

  @ManyToOne(() => PositionTypeEntity, (position) => position.workExperiences)
  @JoinColumn({ name: "position_id", referencedColumnName: "id" })
  position: PositionTypeEntity;

  @OneToOne(() => CandidateEntity, (candidate) => candidate.workExperience)
  @JoinColumn({ name: "candidate_id", referencedColumnName: "id" })
  candidate: CandidateEntity
}