import { Column, Entity, ManyToMany, OneToMany } from "typeorm";
import { BaseEntity } from "../base/base.entity";
import { StatusEnum } from "./../../../constants";
import { CandidateEntity } from "./candidate.entity";
import { CompetencyEntity } from "./competency.entity";
import { WorkExperienceEntity } from "./work-experience.entity";

@Entity({ name: "position_types" })
export class PositionTypeEntity extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: "enum", enum: StatusEnum, default: StatusEnum.ACTIVE })
  status: StatusEnum;

  @ManyToMany(() => CompetencyEntity, (competency) => competency.positionTypes)
  competencies: CompetencyEntity[]

  @OneToMany(() => WorkExperienceEntity, (workExperience) => workExperience.position)
  workExperiences: WorkExperienceEntity[]

  @OneToMany(() => CandidateEntity, (candidate) => candidate.desiredPosition)
  desiredPositions: CandidateEntity[]
}