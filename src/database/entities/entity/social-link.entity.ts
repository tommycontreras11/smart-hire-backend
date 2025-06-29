import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "../base/base.entity";
import { CandidateEntity } from "./candidate.entity";

export enum PlatformTypeEnum {
  GITHUB = "GITHUB",
  PORTFOLIO = "PORTFOLIO",
}

export type PlatformType = keyof typeof PlatformTypeEnum;

@Entity({ name: "social_links" })
export class SocialLinkEntity extends BaseEntity {
  @Column()
  url: string;

  @Column()
  platform: PlatformType;

  @Column()
  candidate_id: number;

  @ManyToOne(() => CandidateEntity, (candidate) => candidate.socialLinks)
  @JoinColumn({ name: "candidate_id", referencedColumnName: "id" })
  candidate: CandidateEntity;
}
