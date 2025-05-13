import { Request, Response } from "express";
import { deleteRequestService } from "../../services/request/delete.service";
import { statusCode } from "../../utils/status.util";

export const deleteRequestController = async (req: Request, res: Response) => {
  const { uuid } = req.params;

  deleteRequestService(uuid)
    .then((data) => res.status(statusCode.OK).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
