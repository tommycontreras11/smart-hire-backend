import { Request, Response } from "express";
import { getAllPositionTypeService } from "../../services/position-type/getAll.service";
import { statusCode } from "../../utils/status.util";

export const getAllPositionTypeController = async (_req: Request, res: Response) => {
  getAllPositionTypeService({})
    .then((data) => {
      const positionTypes = data.map((positionType) => ({
        uuid: positionType.uuid,
        name: positionType.name,
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
