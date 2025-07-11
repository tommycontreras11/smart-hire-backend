import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "../base/base.entity";
import { StatusRequestEnum, StatusRequestType } from "./../../../constants";
import { RequestEntity } from "./request.entity";

@Entity({ name: "request_histories" })
export class RequestHistoryEntity extends BaseEntity {  
  @Column()
  request_id: number
  
  @Column({ type: "enum", enum: StatusRequestEnum, default: StatusRequestEnum.DRAFT })
  status: StatusRequestType;

  @ManyToOne(() => RequestEntity, (request) => request.histories)
  @JoinColumn({ name: "request_id", referencedColumnName: "id" })
  request: RequestEntity
}