import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "../base/base.entity";
import { PositionTypeEntity } from "./position-type.entity";
import { CandidateEntity } from "./candidate.entity";

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

  @Column()
  position_id: number;

  @ManyToOne(() => PositionTypeEntity, (position) => position.workExperiences)
  @JoinColumn({ name: "position_id", referencedColumnName: "id" })
  position: PositionTypeEntity;

  @OneToMany(() => CandidateEntity, (candidate) => candidate.workExperience)
  candidates: CandidateEntity[]
}
