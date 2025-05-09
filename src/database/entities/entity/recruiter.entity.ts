import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { PersonBaseEntity } from "../base/person.base.entity";
import { JobPositionEntity } from "./job-position.entity";
import { RequestEntity } from "./request.entity";
import { InstitutionEntity } from "./institution.entity";

@Entity({ name: "recruiters" })
export class RecruiterEntity extends PersonBaseEntity {
  @Column()
  file_name: string;

  @ManyToOne(() => InstitutionEntity, (institution) => institution.recruiters)
  @JoinColumn({ name: "institution_id", referencedColumnName: "id" })
  institution: InstitutionEntity;

  @OneToMany(() => JobPositionEntity, (jobPosition) => jobPosition.recruiter)
  jobPositions: JobPositionEntity[];

  @OneToMany(() => RequestEntity, (request) => request.recruiter)
  requests: RequestEntity[];
}
