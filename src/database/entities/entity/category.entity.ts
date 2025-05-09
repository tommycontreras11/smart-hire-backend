import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity, StatusEnum, StatusType } from "../base/base.entity";
import { CompetencyEntity } from "./competency.entity";

@Entity({ name: "categories" })
export class CategoryEntity extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: "enum", enum: StatusEnum, default: StatusEnum.ACTIVE })
  state: StatusType;

  @OneToMany(() => CompetencyEntity, (competency) => competency.category)
  competencies: CompetencyEntity[]
}