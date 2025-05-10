import { PositionTypeEntity } from "../../database/entities/entity/position-type.entity";
import { statusCode } from "../../utils/status.util";

export async function deletePositionTypeService(uuid: string) {
  const foundPositionType = await PositionTypeEntity.findOneBy({ uuid }).catch((e) => {
    console.error("updatePositionTypeService -> PositionTypeEntity.findOneBy: ", e);
    return null;
  });

  if (!foundPositionType) {
    return Promise.reject({
      message: "Position type not found",
      status: statusCode.NOT_FOUND,
    });
  }

  await foundPositionType.softRemove().catch((e) => {
    console.error("updatePositionTypeService -> PositionTypeEntity.update: ", e);
    return null;
  });

  return "Position type deleted successfully";
}
