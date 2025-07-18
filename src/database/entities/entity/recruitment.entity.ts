import {
  BaseEntity,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn
} from "typeorm";
import { CandidateEntity } from "./candidate.entity";
import { RecruiterEntity } from "./recruiter.entity";
import { RequestEntity } from "./request.entity";

@Entity({ name: "recruitment" })
export class RecruitmentEntity extends BaseEntity {
  @PrimaryColumn()
  request_id: number;

  @PrimaryColumn()
  recruiter_id: number;

  @PrimaryColumn()
  candidate_id: number;

  @ManyToOne(() => RecruiterEntity, (recruiter) => recruiter.recruitment)
  @JoinColumn({ name: "recruiter_id", referencedColumnName: "id" })
  recruiter: RecruiterEntity;

  @ManyToOne(() => RequestEntity, (request) => request.recruitment)
  @JoinColumn({ name: "request_id", referencedColumnName: "id" })
  request: RequestEntity;

  @ManyToOne(() => CandidateEntity, (candidate) => candidate.recruitment)
  @JoinColumn({ name: "candidate_id", referencedColumnName: "id" })
  candidate: CandidateEntity;
}
