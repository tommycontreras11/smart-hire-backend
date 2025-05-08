import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "../base/base.entity";
import { RequestEntity, StatusRequestEnum, StatusRequestType } from "./request.entity";

@Entity({ name: "request_histories" })
export class RequestHistoryEntity extends BaseEntity {
  @Column({ type: "enum", enum: StatusRequestEnum })
  status: StatusRequestType;

  @Column()
  request_id: number

  @ManyToOne(() => RequestEntity, (request) => request.history)
  @JoinColumn({ name: "request_id", referencedColumnName: "id" })
  request: RequestEntity
}