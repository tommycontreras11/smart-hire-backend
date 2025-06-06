import { Request, Response } from "express";
import { acceptJobService } from "./../../services/request/acceptJob.service";
import { statusCode } from "../../utils/status.util";

export const acceptJobController = async (req: Request, res: Response) => {
  acceptJobService(req.body)
    .then((data) => res.status(statusCode.CREATED).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
