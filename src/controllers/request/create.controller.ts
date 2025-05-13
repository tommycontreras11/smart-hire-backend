import { Request, Response } from "express";
import { createRequestService } from "../../services/request/create.service";
import { statusCode } from "../../utils/status.util";

export const createRequestController = async (req: Request, res: Response) => {
  createRequestService(req.body)
    .then((data) => res.status(statusCode.CREATED).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
