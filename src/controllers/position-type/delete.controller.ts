import { Request, Response } from "express";
import { deletePositionTypeService } from "../../services/position-type/delete.service";
import { statusCode } from "../../utils/status.util";

export const deletePositionTypeController = async (req: Request, res: Response) => {
  const { uuid } = req.params;

  deletePositionTypeService(uuid)
    .then((data) => res.status(statusCode.OK).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
