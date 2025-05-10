import { statusCode } from "../../utils/status.util";
import { PositionTypeEntity } from "../../database/entities/entity/position-type.entity";
import { UpdatePositionTypeDTO } from "../../dto/position-type.dto";
import { Not } from "typeorm";

export async function updatePositionTypeService(
  uuid: string,
  { name, status }: UpdatePositionTypeDTO
) {
  const foundPositionType = await PositionTypeEntity.findOneBy({ uuid }).catch(
    (e) => {
      console.error(
        "updatePositionTypeService -> PositionTypeEntity.findOneBy: ",
        e
      );
      return null;
    }
  );

  if (!foundPositionType) {
    return Promise.reject({
      message: "Position type not found",
      status: statusCode.NOT_FOUND,
    });
  }

  if (name) {
    const existingPositionType = await PositionTypeEntity.findOne({
      where: { name, uuid: Not(uuid) },
    }).catch((e) => {
      console.error(
        "updatePositionTypeService -> PositionTypeEntity.findOneBy: ",
        e
      );
      return null;
    });

    if (existingPositionType) {
      return Promise.reject({
        message: "Position type already exists",
        status: statusCode.BAD_REQUEST,
      });
    }
  }

  await PositionTypeEntity.update(
    { uuid },
    { ...(name && { name }), ...(status && { status }) }
  ).catch((e) => {
    console.error(
      "updatePositionTypeService -> PositionTypeEntity.update: ",
      e
    );
    return null;
  });

  return "Position type updated successfully";
}