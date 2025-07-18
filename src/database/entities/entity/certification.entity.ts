import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne } from "typeorm";
import { BaseEntity } from "../base/base.entity";
import { StatusEnum, StatusType } from "./../../../constants";
import { CandidateEntity } from "./candidate.entity";
import { CompetencyEntity } from "./competency.entity";
import { InstitutionEntity } from "./institution.entity";

@Entity({ name: "certifications" })
export class CertificationEntity extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ type: "date", nullable: true })
  expedition_date: Date;

  @Column({ type: "date", nullable: true })
  expiration_date: Date;

  @Column({ nullable: true })
  credential_id: string;

  @Column({ nullable: true })
  credential_link: string;

  @Column()
  candidate_id: number;

  @Column()
  institution_id: number;

  @Column({ type: "enum", enum: StatusEnum, default: StatusEnum.ACTIVE })
  status: StatusType;

  @ManyToOne(() => CandidateEntity, (candidate) => candidate.certifications)
  @JoinColumn({ name: "candidate_id", referencedColumnName: "id" })
  candidate: CandidateEntity;

  @ManyToOne(
    () => InstitutionEntity,
    (institution) => institution.certifications
  )
  @JoinColumn({ name: "institution_id", referencedColumnName: "id" })
  institution: InstitutionEntity;

  @ManyToMany(() => CompetencyEntity, (competency) => competency.educations)
  @JoinTable({
    name: "certification_competencies",
    joinColumn: { 
      name: "certification_id", 
      referencedColumnName: "id" 
    },
    inverseJoinColumn: { 
      name: "competency_id", 
      referencedColumnName: "id" 
    },
  })
  competencies: CompetencyEntity[];
}
