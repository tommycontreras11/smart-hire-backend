import { Request, Response } from "express";
import { createJobPositionService } from "../../services/job-position/create.service";
import { statusCode } from "../../utils/status.util";

export const createJobPositionController = async (req: Request, res: Response) => {
  createJobPositionService(req.body)
    .then((data) => res.status(statusCode.CREATED).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
