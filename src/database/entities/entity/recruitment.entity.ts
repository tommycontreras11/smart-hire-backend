import {
  BaseEntity,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { CandidateEntity } from "./candidate.entity";
import { RecruiterEntity } from "./recruiter.entity";

@Entity({ name: "recruitment" })
export class RecruitmentEntity extends BaseEntity {
  @PrimaryColumn()
  recruiter_id: number;

  @PrimaryColumn()
  candidate_id: number;

  @ManyToOne(() => RecruiterEntity, (recruiter) => recruiter.recruitment)
  @JoinColumn({ name: "recruiter_id", referencedColumnName: "id" })
  recruiter: RecruiterEntity;

  @ManyToOne(() => CandidateEntity, (candidate) => candidate.recruitment)
  @JoinColumn({ name: "candidate_id", referencedColumnName: "id" })
  candidate: CandidateEntity;
}
