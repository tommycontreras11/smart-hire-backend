import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "../base/base.entity";
import { StatusEnum } from "./../../../constants";
import { JobPositionEntity } from "./job-position.entity";

@Entity({ name: "languages" })
export class LanguageEntity extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: "enum", enum: StatusEnum, default: StatusEnum.ACTIVE })
  status: StatusEnum;

  @OneToMany(() => JobPositionEntity, (jobPosition) => jobPosition.language)
  jobPositions: JobPositionEntity[];
}