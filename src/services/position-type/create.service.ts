import { PositionTypeEntity } from "../../database/entities/entity/position-type.entity";
import { CreatePositionTypeDTO } from "../../dto/position-type.dto";
import { statusCode } from "../../utils/status.util";

export async function createPositionTypeService({ name }: CreatePositionTypeDTO) {
  const foundPositionType = await PositionTypeEntity.findOneBy({ name }).catch((e) => {
    console.error("createPositionTypeService -> PositionTypeEntity.findOneBy: ", e);
    return null;
  });

  if (foundPositionType) {
    return Promise.reject({
      message: "Position type already exists",
      status: statusCode.BAD_REQUEST,
    });
  }

  await PositionTypeEntity.create({
    name,
  })
    .save()
    .catch((e) => {
      console.error("createPositionTypeService -> PositionTypeEntity.create: ", e);
      return null;
    });

  return "Position type created successfully";
}
