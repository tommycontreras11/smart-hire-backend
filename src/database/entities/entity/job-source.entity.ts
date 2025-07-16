import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "../base/base.entity";
import { StatusEnum, StatusType } from "./../../../constants";
import { WorkExperienceEntity } from "./work-experience.entity";

@Entity({ name: "job_sources" })
export class JobSourceEntity extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: "enum", enum: StatusEnum, default: StatusEnum.ACTIVE })
  status: StatusType;

  @OneToMany(
    () => WorkExperienceEntity,
    (workExperience) => workExperience.jobSource
  )
  workExperiences: WorkExperienceEntity[];
}
