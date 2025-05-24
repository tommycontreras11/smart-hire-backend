import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne
} from "typeorm";
import { PersonBaseEntity } from "../base/person.base.entity";
import { StatusEnum, StatusType } from "./../../../constants";
import { DepartmentEntity } from "./department.entity";
import { PositionTypeEntity } from "./position-type.entity";

@Entity({ name: "employees" })
export class EmployeeEntity extends PersonBaseEntity {
  @Column({ type: "float", precision: 10, scale: 2 })
  monthly_salary: number;

  @Column()
  entry_date: Date;
  
  @Column()
  department_id: number;

  @Column()
  position_type_id: number;

  @Column()
  file_name: string;

  @Column({ type: "enum", enum: StatusEnum, default: StatusEnum.ACTIVE })
  status: StatusType;

  @ManyToOne(() => DepartmentEntity, (department) => department.employees)
  @JoinColumn({ name: "department_id", referencedColumnName: "id" })
  department: DepartmentEntity;

  @ManyToOne(
    () => PositionTypeEntity,
    (positionType) => positionType.employees
  )
  @JoinColumn({ name: "position_type_id", referencedColumnName: "id" })
  positionType: PositionTypeEntity;
}