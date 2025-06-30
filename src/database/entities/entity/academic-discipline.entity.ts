import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "../base/base.entity";
import { StatusEnum, StatusType } from "./../../../constants";
import { EducationEntity } from "./education.entity";

@Entity({ name: "academic_disciplines" })
export class AcademicDisciplineEntity extends BaseEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: "enum", enum: StatusEnum, default: StatusEnum.ACTIVE })
  status: StatusType;

  @OneToMany(() => EducationEntity, (education) => education.academicDiscipline)
  educations: EducationEntity;
}
