import { Column, Entity, ManyToMany } from "typeorm";
import { BaseEntity, StatusEnum, StatusType } from "../base/base.entity";
import { CompetencyEntity } from "./competency.entity";

@Entity({ name: "evaluation_methods" })
export class EvaluationMethodEntity extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: "enum", enum: StatusEnum, default: StatusEnum.ACTIVE })
  status: StatusType;

  @ManyToMany(() => CompetencyEntity, (competency) => competency.evaluationMethods)
  competencies: CompetencyEntity[]
}
