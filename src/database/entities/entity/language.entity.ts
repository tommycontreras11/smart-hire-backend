import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity, StatusEnum, StatusType } from "../base/base.entity";
import { JobPositionEntity } from "./job-position.entity";

@Entity({ name: "languages" })
export class LanguageEntity extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: "enum", enum: StatusEnum })
  state: StatusType;

  @OneToMany(() => JobPositionEntity, (jobPosition) => jobPosition.language)
  jobPositions: JobPositionEntity[];
}
