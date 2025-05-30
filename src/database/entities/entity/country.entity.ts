import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "../base/base.entity";
import { StatusEnum, StatusType } from "./../../../constants";
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