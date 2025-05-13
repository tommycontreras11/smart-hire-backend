import { FindManyOptions } from "typeorm";
import { RequestEntity } from "../../database/entities/entity/request.entity";
import { statusCode } from "../../utils/status.util";

export async function getAllRequestService(
  options?: FindManyOptions<RequestEntity>
) {
  const categories = await RequestEntity.find(options).catch((e) => {
    console.error("getAllRequestService -> RequestEntity.find: ", e);
    return null;
  });

  if (!categories)
    return Promise.reject({
      message: "No categories found",
      status: statusCode.NOT_FOUND,
    });

  return categories;
}