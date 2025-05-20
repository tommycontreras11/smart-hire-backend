import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { BaseEntity } from "../base/base.entity";
import { StatusEnum, StatusType } from "./../../../constants";
import { CandidateEntity } from "./candidate.entity";
import { CategoryEntity } from "./category.entity";
import { EvaluationMethodEntity } from "./evaluation-method.entity";
import { JobPositionEntity } from "./job-position.entity";
import { PositionTypeEntity } from "./position-type.entity";

export enum LevelCompetencyEnum {
  BEGINNER = "BEGINNER",
  INTERMEDIATE = "INTERMEDIATE",
  ADVANCED = "ADVANCED",
}

export type LevelCompetencyType = keyof typeof LevelCompetencyEnum;

@Entity({ name: "competencies" })
export class CompetencyEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  category_id: number;

  @Column({ type: "enum", enum: LevelCompetencyEnum })
  level: LevelCompetencyType;

  @Column({ type: "enum", enum: StatusEnum, default: StatusEnum.ACTIVE })
  status: StatusType;

  @ManyToOne(() => CategoryEntity, (category) => category.competencies)
  @JoinColumn({ name: "category_id", referencedColumnName: "id" })
  category: CategoryEntity;

  @ManyToMany(
    () => EvaluationMethodEntity,
    (evaluationMethod) => evaluationMethod.competencies
  )
  @JoinTable({
    name: "competency_evaluation_methods",
    joinColumn: { name: "competency_id", referencedColumnName: "id" },
    inverseJoinColumn: {
      name: "evaluation_method_id",
      referencedColumnName: "id",
    },
  })
  evaluationMethods: EvaluationMethodEntity[];

  @ManyToMany(
    () => PositionTypeEntity,
    (positionType) => positionType.competencies
  )
  @JoinTable({
    name: "competency_position_types",
    joinColumn: { name: "competency_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "position_type_id", referencedColumnName: "id" },
  })
  positionTypes: PositionTypeEntity[];

  @OneToMany(() => CandidateEntity, (candidate) => candidate.competencies)
  candidates: CandidateEntity[];

  @ManyToMany(() => JobPositionEntity, (jobPosition) => jobPosition.competencies)
  jobPositions: JobPositionEntity[];
}