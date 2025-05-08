import { Column, Entity, ManyToMany, OneToMany } from "typeorm";
import { BaseEntity, StatusEnum, StatusType } from "../base/base.entity";
import { CompetencyEntity } from "./competency.entity";
import { WorkExperienceEntity } from "./work-experience.entity";
import { CandidateEntity } from "./candidate.entity";

@Entity({ name: "position_types" })
export class PositionTypeEntity extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: "enum", enum: StatusEnum })
  state: StatusType;

  @ManyToMany(() => CompetencyEntity, (competency) => competency.positionTypes)
  competencies: CompetencyEntity[]

  @OneToMany(() => WorkExperienceEntity, (workExperience) => workExperience.position)
  workExperiences: WorkExperienceEntity[]

  @OneToMany(() => CandidateEntity, (candidate) => candidate.desiredPosition)
  desiredPositions: CandidateEntity[]
}
