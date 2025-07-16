import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne
} from "typeorm";
import { BaseEntity } from "../base/base.entity";
import { WorkMetadata } from "../interfaces/work-metadata.interface";
import { StatusEnum, StatusType } from "./../../../constants";
import {
  WorkContractType,
  WorkContractTypeEnum,
  WorkLocationType,
  WorkLocationTypeEnum,
} from "./../../../enums/work.enum";
import { CandidateEntity } from "./candidate.entity";
import { CompetencyEntity } from "./competency.entity";
import { InstitutionEntity } from "./institution.entity";
import { JobSourceEntity } from "./job-source.entity";
import { PositionTypeEntity } from "./position-type.entity";

@Entity({ name: "work_experiences" })
export class WorkExperienceEntity extends BaseEntity implements WorkMetadata {
  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ type: "date" })
  date_from: Date;

  @Column({ type: "date" })
  date_to: Date;

  @Column({ nullable: true })
  location: string;

  @Column({ type: "enum", enum: WorkContractTypeEnum, nullable: true })
  work_type: WorkContractType;

  @Column({ type: "enum", enum: WorkLocationTypeEnum, nullable: true })
  work_location: WorkLocationType;

  @Column({ default: false })
  current_position: boolean;

  @Column()
  position_id: number;

  @Column()
  candidate_id: number;

  @Column()
  institution_id: number;
  
  @Column({ nullable: true })
  job_source_id: number;

  @Column({ type: "enum", enum: StatusEnum, default: StatusEnum.ACTIVE })
  status: StatusType;

  @ManyToOne(() => PositionTypeEntity, (position) => position.workExperiences)
  @JoinColumn({ name: "position_id", referencedColumnName: "id" })
  position: PositionTypeEntity;

  @ManyToOne(() => CandidateEntity, (candidate) => candidate.workExperiences)
  @JoinColumn({ name: "candidate_id", referencedColumnName: "id" })
  candidate: CandidateEntity;

  @ManyToOne(() => JobSourceEntity, (jobSource) => jobSource.workExperiences)
  @JoinColumn({ name: "job_source_id", referencedColumnName: "id" })
  jobSource: JobSourceEntity;

  @ManyToOne(
    () => InstitutionEntity,
    (institution) => institution.workExperience
  )
  @JoinColumn({ name: "institution_id", referencedColumnName: "id" })
  institution: InstitutionEntity;

  @ManyToMany(
    () => CompetencyEntity,
    (competency) => competency.workExperiences
  )
  @JoinTable({
    joinColumns: [{ name: "work_experience_id", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "competency_id", referencedColumnName: "id" }],
  })
  competencies: CompetencyEntity[];
}
