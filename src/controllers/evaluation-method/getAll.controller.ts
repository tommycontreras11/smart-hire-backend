import { Request, Response } from "express";
import { getAllEvaluationMethodService } from "../../services/evaluation-method/getAll.service";
import { statusCode } from "../../utils/status.util";

export const getAllEvaluationMethodController = async (_req: Request, res: Response) => {
  getAllEvaluationMethodService({})
    .then((data) => {
      const evaluationMethods = data.map((evaluationMethod) => ({
        uuid: evaluationMethod.uuid,
        name: evaluationMethod.name,
        status: evaluationMethod.status,
      }));

      res.status(statusCode.OK).json({ data: evaluationMethods });
    })
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
