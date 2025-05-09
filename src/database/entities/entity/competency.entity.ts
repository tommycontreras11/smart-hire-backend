import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { BaseEntity, StatusEnum, StatusType } from "../base/base.entity";
import { CategoryEntity } from "./category.entity";
import { EvaluationMethodEntity } from "./evaluation-method.entity";
import { PositionTypeEntity } from "./position-type.entity";
import { CandidateEntity } from "./candidate.entity";

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

  @Column()
  evaluation_method_id: number;

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
}
