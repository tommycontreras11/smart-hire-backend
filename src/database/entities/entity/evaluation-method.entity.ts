import { Column, Entity, ManyToMany } from "typeorm";
import { BaseEntity } from "../base/base.entity";
import { StatusEnum } from "./../../../constants";
import { CompetencyEntity } from "./competency.entity";

@Entity({ name: "evaluation_methods" })
export class EvaluationMethodEntity extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: "enum", enum: StatusEnum, default: StatusEnum.ACTIVE })
  status: StatusEnum;

  @ManyToMany(() => CompetencyEntity, (competency) => competency.evaluationMethods)
  competencies: CompetencyEntity[]
}