import { Column } from "typeorm";
import { BaseEntity } from "./base.entity";

export class PersonBaseEntity extends BaseEntity {
  @Column({ unique: true })
  identification: string;

  @Column()
  name: string;

  @Column()
  password: string;
}
