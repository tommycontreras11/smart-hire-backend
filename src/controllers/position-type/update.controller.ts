import { Request, Response } from "express";
import { updatePositionTypeService } from "../../services/position-type/update.service";
import { statusCode } from "../../utils/status.util";

export const updatePositionTypeController = async (req: Request, res: Response) => {
  const { uuid } = req.params;

  updatePositionTypeService(uuid, req.body)
    .then((data) => res.status(statusCode.OK).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
