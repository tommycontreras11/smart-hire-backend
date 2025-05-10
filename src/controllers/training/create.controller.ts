import { Request, Response } from "express";
import { createTrainingService } from "../../services/training/create.service";
import { statusCode } from "../../utils/status.util";

export const createTrainingController = async (req: Request, res: Response) => {
  createTrainingService(req.body)
    .then((data) => res.status(statusCode.CREATED).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
