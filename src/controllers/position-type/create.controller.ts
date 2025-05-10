import { Request, Response } from "express";
import { createPositionTypeService } from "../../services/position-type/create.service";
import { statusCode } from "../../utils/status.util";

export const createPositionTypeController = async (req: Request, res: Response) => {
  createPositionTypeService(req.body)
    .then((data) => res.status(statusCode.CREATED).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
