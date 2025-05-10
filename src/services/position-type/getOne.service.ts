import { statusCode } from "../../utils/status.util";
import { PositionTypeEntity } from "../../database/entities/entity/position-type.entity";
import { FindOneOptions } from "typeorm";

export async function getOnePositionTypeService(
  option: FindOneOptions<PositionTypeEntity>
) {
  const foundPositionType = await PositionTypeEntity.findOne(option).catch((e) => {
    console.error("getOnePositionTypeService -> PositionTypeEntity.findOne: ", e);
    return null;
  });

  if (!foundPositionType) {
    return Promise.reject({
      message: "Position type not found",
      status: statusCode.NOT_FOUND,
    });
  }

  return foundPositionType;
}
