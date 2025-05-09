import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "../base/base.entity";
import { RequestEntity } from "./request.entity";
import { StatusRequestEnum, StatusRequestType } from "./../../../constants";

@Entity({ name: "request_histories" })
export class RequestHistoryEntity extends BaseEntity {  
  @Column()
  request_id: number
  
  @Column({ type: "enum", enum: StatusRequestEnum, default: StatusRequestEnum.DRAFT })
  status: StatusRequestType;

  @ManyToOne(() => RequestEntity, (request) => request.history)
  @JoinColumn({ name: "request_id", referencedColumnName: "id" })
  request: RequestEntity
}