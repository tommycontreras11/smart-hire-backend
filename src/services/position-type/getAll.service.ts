import { statusCode } from "../../utils/status.util";
import { PositionTypeEntity } from "../../database/entities/entity/position-type.entity";
import { FindManyOptions } from "typeorm";

export async function getAllPositionTypeService(
  options?: FindManyOptions<PositionTypeEntity>
) {
  const positionTypes = await PositionTypeEntity.find(options).catch((e) => {
    console.error("getAllPositionTypeService -> PositionTypeEntity.find: ", e);
    return null;
  });

  if (!positionTypes)
    return Promise.reject({
      message: "No position types found",
      status: statusCode.NOT_FOUND,
    });

  return positionTypes;
}
