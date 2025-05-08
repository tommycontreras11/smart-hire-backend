import { Entity, OneToMany } from "typeorm";
import { PersonBaseEntity } from "../base/person.base.entity";
import { JobPositionEntity } from "./job-position.entity";
import { RequestEntity } from "./request.entity";

@Entity({ name: "recruiters" })
export class RecruiterEntity extends PersonBaseEntity {
  @OneToMany(() => JobPositionEntity, (jobPosition) => jobPosition.recruiter)
  jobPositions: JobPositionEntity[];

  @OneToMany(() => RequestEntity, (request) => request.recruiter)
  requests: RequestEntity[];
}
