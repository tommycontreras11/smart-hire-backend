import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "../base/base.entity";
import { StatusEnum, StatusType } from "./../../../constants";
import { CandidateEntity } from "./candidate.entity";
import { CompetencyEntity } from "./competency.entity";
import { WorkExperienceEntity } from "./work-experience.entity";
import { EmployeeEntity } from "./employee.entity";
import { JobPositionEntity } from "./job-position.entity";
import { DepartmentEntity } from "./department.entity";

@Entity({ name: "position_types" })
export class PositionTypeEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  department_id: number;

  @Column({ type: "enum", enum: StatusEnum, default: StatusEnum.ACTIVE })
  status: StatusType;

  @ManyToOne(() => DepartmentEntity, (department) => department.positionTypes)
  @JoinColumn({ name: "department_id", referencedColumnName: "id" })
  department: DepartmentEntity;

  @ManyToMany(() => CompetencyEntity, (competency) => competency.positionTypes)
  competencies: CompetencyEntity[];

  @OneToMany(
    () => WorkExperienceEntity,
    (workExperience) => workExperience.position
  )
  workExperiences: WorkExperienceEntity[];

  @OneToMany(() => CandidateEntity, (candidate) => candidate.desiredPosition)
  desiredPositions: CandidateEntity[];

  @OneToMany(() => EmployeeEntity, (employee) => employee.positionType)
  employees: EmployeeEntity[];

  @OneToMany(() => JobPositionEntity, (jobPosition) => jobPosition.positionType)
  jobPositions: JobPositionEntity[];
}
