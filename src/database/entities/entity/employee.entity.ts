import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne
} from "typeorm";
import { PersonBaseEntity } from "../base/person.base.entity";
import { StatusEnum } from "./../../../constants";
import { DepartmentEntity } from "./department.entity";
import { JobPositionEntity } from "./job-position.entity";

@Entity({ name: "employees" })
export class EmployeeEntity extends PersonBaseEntity {
  @Column({ type: "float", precision: 10, scale: 2 })
  monthly_salary: number;

  @Column()
  entry_date: Date;
  
  @Column()
  department_id: number;

  @Column()
  job_position_id: number;

  @Column()
  file_name: string;

  @Column({ type: "enum", enum: StatusEnum, default: StatusEnum.ACTIVE })
  status: StatusEnum;

  @ManyToOne(() => DepartmentEntity, (department) => department.employees)
  @JoinColumn({ name: "department_id", referencedColumnName: "id" })
  department: DepartmentEntity;

  @ManyToOne(
    () => JobPositionEntity,
    (jobPosition) => jobPosition.employees
  )
  @JoinColumn({ name: "job_position_id", referencedColumnName: "id" })
  jobPosition: JobPositionEntity;
}