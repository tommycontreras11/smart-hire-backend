import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "../base/base.entity";
import { StatusRequestEnum } from "./../../../constants";
import { RequestEntity } from "./request.entity";

@Entity({ name: "request_histories" })
export class RequestHistoryEntity extends BaseEntity {  
  @Column()
  request_id: number
  
  @Column({ type: "enum", enum: StatusRequestEnum, default: StatusRequestEnum.DRAFT })
  status: StatusRequestEnum;

  @ManyToOne(() => RequestEntity, (request) => request.history)
  @JoinColumn({ name: "request_id", referencedColumnName: "id" })
  request: RequestEntity
}