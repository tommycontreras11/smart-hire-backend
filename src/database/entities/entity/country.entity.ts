import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity, StatusEnum, StatusType } from "../base/base.entity";
import { JobPositionEntity } from "./job-position.entity";

@Entity({ name: "countries" })
export class CountryEntity extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: "enum", enum: StatusEnum, default: StatusEnum.ACTIVE })
  status: StatusType;

  @OneToMany(() => JobPositionEntity, (jobPosition) => jobPosition.country)
  jobPositions: JobPositionEntity[];
}
