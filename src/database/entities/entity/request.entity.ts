import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "../base/base.entity";
import { StatusRequestEnum, StatusRequestType } from "./../../../constants";
import { CandidateEntity } from "./candidate.entity";
import { JobPositionEntity } from "./job-position.entity";
import { RecruiterEntity } from "./recruiter.entity";
import { RequestHistoryEntity } from "./request-history.entity";
import { RecruitmentEntity } from "./recruitment.entity";

@Entity({ name: "requests" })
export class RequestEntity extends BaseEntity {
  @Column({ nullable: true })
  next_step: string;

  @Column({ type: "datetime", nullable: true })
  interview_date: Date | null;

  @Column({ type: "enum", enum: StatusRequestEnum, default: StatusRequestEnum.DRAFT })
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

  @OneToMany(() => RecruitmentEntity, (recruitment) => recruitment.request)
  recruitment: RecruitmentEntity[];
}