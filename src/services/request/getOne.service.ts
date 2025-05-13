import { statusCode } from "../../utils/status.util";
import { RequestEntity } from "../../database/entities/entity/request.entity";
import { FindOneOptions } from "typeorm";

export async function getOneRequestService(
  option: FindOneOptions<RequestEntity>
) {
  const foundRequest = await RequestEntity.findOne(option).catch((e) => {
    console.error("getOneRequestService -> RequestEntity.findOne: ", e);
    return null;
  });

  if (!foundRequest) {
    return Promise.reject({
      message: "Request not found",
      status: statusCode.NOT_FOUND,
    });
  }

  return foundRequest;
}