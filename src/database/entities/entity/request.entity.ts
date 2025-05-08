import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "../base/base.entity";
import { CandidateEntity } from "./candidate.entity";
import { JobPositionEntity } from "./job-position.entity";
import { RecruiterEntity } from "./recruiter.entity";
import { RequestHistoryEntity } from "./request-history.entity";

export enum StatusRequestEnum {
  DRAFT = "DRAFT", // The request is being created but not yet submitted
  SUBMITTED = "SUBMITTED", // The request was submitted by the candidate or recruiter
  UNDER_REVIEW = "UNDER_REVIEW", // HR is reviewing the request
  INTERVIEW = "INTERVIEW", // The candidate is scheduled for/interviewing
  EVALUATED = "EVALUATED", // Candidate interview has been completed and evaluated
  APPROVED = "APPROVED", // HR/management approved the candidate for hire
  REJECTED = "REJECTED", // The candidate was not selected
  HIRED = "HIRED", // The candidate has accepted the offer and is hired
  CANCELLED = "CANCELLED", // The process was stopped or withdrawn
}

export type StatusRequestType = keyof typeof StatusRequestEnum;

@Entity({ name: "requests" })
export class RequestEntity extends BaseEntity {
  @Column({ type: "enum", enum: StatusRequestEnum })
  status: StatusRequestType;

  @Column()
  candidate_id: number;

  @Column()
  job_position_id: number;

  @Column()
  recruiter_id: number;

  @ManyToOne(() => JobPositionEntity, (jobPosition) => jobPosition.requests)
  @JoinColumn({ name: "job_position_id", referencedColumnName: "id" })
  jobPosition: JobPositionEntity;

  @ManyToOne(() => CandidateEntity, (candidate) => candidate.requests)
  @JoinColumn({ name: "candidate_id", referencedColumnName: "id" })
  candidate: CandidateEntity;

  @ManyToOne(() => RecruiterEntity, (recruiter) => recruiter.requests)
  @JoinColumn({ name: "recruiter_id", referencedColumnName: "id" })
  recruiter: RecruiterEntity;

  @OneToMany(() => RequestHistoryEntity, (history) => history.request)
  history: RequestHistoryEntity[];
}
