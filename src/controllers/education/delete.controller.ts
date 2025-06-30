import { Request, Response } from "express";
import { deleteEducationService } from "./../../services/education/delete.service";
import { statusCode } from "./../../utils/status.util";

export const deleteEducationController = async (
  req: Request,
  res: Response
) => {
  const { uuid } = req.params;

  deleteEducationService(uuid)
    .then((data) => res.status(statusCode.OK).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
