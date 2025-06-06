import { Request, Response } from "express";
import { getAllPositionTypeService } from "../../services/position-type/getAll.service";
import { statusCode } from "../../utils/status.util";

export const getAllPositionTypeController = async (
  req: Request,
  res: Response
) => {
  const { departmentUUID } = req?.query as { departmentUUID?: string };
  getAllPositionTypeService({
    ...(departmentUUID && { where: { department: { uuid: departmentUUID } } }),
    relations: {
      department: true,
    },
  })
    .then((data) => {
      const positionTypes = data.map((positionType) => ({
        uuid: positionType.uuid,
        name: positionType.name,
        department: {
          uuid: positionType.department.uuid,
          name: positionType.department.name,
        },
        status: positionType.status,
      }));

      res.status(statusCode.OK).json({ data: positionTypes });
    })
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
