import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from "typeorm";
import { BaseEntity } from "../base/base.entity";
import { CandidateEntity } from "./candidate.entity";
import { InstitutionEntity } from "./institution.entity";
import { CompetencyEntity } from "./competency.entity";
import { AcademicDisciplineEntity } from "./academic-discipline.entity";

@Entity({ name: "educations" })
export class EducationEntity extends BaseEntity {
  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true, type: "float", precision: 5, scale: 2 })
  grade: number;

  @Column({ nullable: true, length: 1000 })
  description: string;

  @Column({ type: "date", nullable: true })
  start_date: Date;

  @Column({ type: "date", nullable: true })
  end_date: Date;

  @Column()
  candidate_id: number;

  @Column()
  institution_id: number;

  @Column({ nullable: true })
  academic_discipline_id: number;

  @ManyToOne(() => CandidateEntity, (candidate) => candidate.educations)
  @JoinColumn({ name: "candidate_id", referencedColumnName: "id" })
  candidate: CandidateEntity;

  @ManyToOne(() => InstitutionEntity, (institution) => institution.educations)
  @JoinColumn({ name: "institution_id", referencedColumnName: "id" })
  institution: InstitutionEntity;

  @ManyToOne(() => AcademicDisciplineEntity, (academicDiscipline) => academicDiscipline.educations)
  @JoinColumn({ name: "academic_discipline_id", referencedColumnName: "id" })
  academicDiscipline: AcademicDisciplineEntity;

  @ManyToMany(() => CompetencyEntity, (competency) => competency.educations)
  @JoinTable({
    name: "education_competencies",
    joinColumn: { 
      name: "education_id", 
      referencedColumnName: "id" 
    },
    inverseJoinColumn: { 
      name: "competency_id", 
      referencedColumnName: "id" 
    },
  })
  competencies: CompetencyEntity[];
}
