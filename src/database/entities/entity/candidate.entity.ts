import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
} from "typeorm";
import { PersonBaseEntity } from "../base/person.base.entity";
import { StatusEnum, StatusType } from "./../../../constants";
import { SocialLinkEntity } from "./social-link.entity";
import { CompetencyEntity } from "./competency.entity";
import { DepartmentEntity } from "./department.entity";
import { PositionTypeEntity } from "./position-type.entity";
import { RecruitmentEntity } from "./recruitment.entity";
import { RequestEntity } from "./request.entity";
import { TrainingEntity } from "./training.entity";
import { WorkExperienceEntity } from "./work-experience.entity";
import { EducationEntity } from "./education.entity";
import { CertificationEntity } from "./certification.entity";

@Entity({ name: "candidates" })
export class CandidateEntity extends PersonBaseEntity {
  @Column({ nullable: true })
  bio: string

  @Column({ nullable: true })
  location: string

  @Column({ nullable: true })
  phone: string

  @Column({ type: "float", precision: 10, scale: 2 })
  desired_salary: number;

  @Column({ nullable: true })
  curriculum: string;

  @Column()
  desired_position_id: number;

  @Column()
  department_id: number;

  @Column({ type: "enum", enum: StatusEnum, default: StatusEnum.ACTIVE })
  status: StatusType;

  @ManyToOne(() => PositionTypeEntity, (position) => position.desiredPositions)
  @JoinColumn({ name: "desired_position_id", referencedColumnName: "id" })
  desiredPosition: PositionTypeEntity;

  @ManyToOne(() => DepartmentEntity, (department) => department.candidates)
  @JoinColumn({ name: "department_id", referencedColumnName: "id" })
  department: DepartmentEntity;

  @OneToOne(
    () => WorkExperienceEntity,
    (workExperience) => workExperience.candidate
  )
  workExperience: WorkExperienceEntity;

  @OneToMany(() => RequestEntity, (request) => request.candidate)
  requests: RequestEntity[];

  @ManyToMany(() => CompetencyEntity, (competency) => competency.candidates)
  @JoinTable({
    name: "candidate_competencies",
    joinColumn: {
      name: "candidate_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "competency_id",
      referencedColumnName: "id",
    },
  })
  competencies: CompetencyEntity[];

  @ManyToMany(() => TrainingEntity, (training) => training.candidates)
  @JoinTable({
    name: "candidate_trainings",
    joinColumn: {
      name: "candidate_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "training_id",
      referencedColumnName: "id",
    },
  })
  training: TrainingEntity[];

  @OneToMany(() => RecruitmentEntity, (recruitment) => recruitment.candidate)
  recruitment: RecruitmentEntity[];

  @OneToMany(() => SocialLinkEntity, (socialLink) => socialLink.candidate)
  socialLinks: SocialLinkEntity[];

  @OneToMany(() => EducationEntity, (education) => education.candidate)
  educations: EducationEntity[];

  @OneToMany(() => CertificationEntity, (certification) => certification.candidate)
  certifications: CertificationEntity[];
}