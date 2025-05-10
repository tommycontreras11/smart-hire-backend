import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "../base/base.entity";
import { CompetencyEntity } from "./competency.entity";
import { StatusEnum, StatusType } from "./../../../constants";

@Entity({ name: "categories" })
export class CategoryEntity extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: "enum", enum: StatusEnum, default: StatusEnum.ACTIVE })
  status: StatusEnum;

  @OneToMany(() => CompetencyEntity, (competency) => competency.category)
  competencies: CompetencyEntity[]
}