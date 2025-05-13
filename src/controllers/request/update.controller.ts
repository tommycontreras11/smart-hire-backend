import { Request, Response } from "express";
import { updateRequestService } from "../../services/request/update.service";
import { statusCode } from "../../utils/status.util";

export const updateRequestController = async (req: Request, res: Response) => {
  const { uuid } = req.params;

  updateRequestService(uuid, req.body)
    .then((data) => res.status(statusCode.OK).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
