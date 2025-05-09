import {
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
} from "typeorm";
import { PersonBaseEntity } from "../base/person.base.entity";
import { CompetencyEntity } from "./competency.entity";
import { DepartmentEntity } from "./department.entity";
import { PositionTypeEntity } from "./position-type.entity";
import { RequestEntity } from "./request.entity";
import { TrainingEntity } from "./training.entity";
import { WorkExperienceEntity } from "./work-experience.entity";
import { StatusEnum, StatusType } from "../base/base.entity";

@Entity({ name: "candidates" })
export class CandidateEntity extends PersonBaseEntity {
  @Column({ type: "float", precision: 10, scale: 2 })
  desired_salary: number;

  @Column()
  desired_position_id: number;

  @Column()
  department_id: number;

  @Column()
  work_experience_id: number;

  @Column()
  recommend_by: string;

  @Column()
  file_name: string;

  @Column({ type: "enum", enum: StatusEnum, default: StatusEnum.ACTIVE })
  status: StatusType;

  @ManyToOne(() => PositionTypeEntity, (position) => position.desiredPositions)
  @JoinColumn({ name: "desired_position_id", referencedColumnName: "id" })
  desiredPosition: PositionTypeEntity;

  @ManyToOne(() => DepartmentEntity, (department) => department.candidates)
  @JoinColumn({ name: "department_id", referencedColumnName: "id" })
  department: DepartmentEntity;

  @ManyToOne(
    () => WorkExperienceEntity,
    (workExperience) => workExperience.candidates
  )
  @JoinColumn({ name: "work_experience_id", referencedColumnName: "id" })
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
  trainings: TrainingEntity[];
}