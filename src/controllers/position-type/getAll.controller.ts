import { Request, Response } from "express";
import { getAllPositionTypeService } from "../../services/position-type/getAll.service";
import { statusCode } from "../../utils/status.util";

export const getAllPositionTypeController = async (_req: Request, res: Response) => {
  getAllPositionTypeService({})
    .then((data) => {
      const countries = data.map((c) => ({
        uuid: c.uuid,
        name: c.name,
        status: c.status,
      }));

      res.status(statusCode.OK).json({ data: countries });
    })
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
