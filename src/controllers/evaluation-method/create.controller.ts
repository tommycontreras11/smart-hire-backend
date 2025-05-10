import { Request, Response } from "express";
import { createEvaluationMethodService } from "../../services/evaluation-method/create.service";
import { statusCode } from "../../utils/status.util";

export const createEvaluationMethodController = async (req: Request, res: Response) => {
  createEvaluationMethodService(req.body)
    .then((data) => res.status(statusCode.CREATED).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
