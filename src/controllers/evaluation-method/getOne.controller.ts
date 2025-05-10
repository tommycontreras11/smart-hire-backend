import { Request, Response } from "express";
import { getOneEvaluationMethodService } from "../../services/evaluation-method/getOne.service";
import { statusCode } from "../../utils/status.util";

export const getOneEvaluationMethodController = async (req: Request, res: Response) => {
  const { uuid } = req.params;

  getOneEvaluationMethodService({
    where: {
      uuid,
    },
  })
    .then((data) => {
      const evaluationMethod = {
        uuid: data.uuid,
        name: data.name,
        status: data.status,
      };

      res.status(statusCode.OK).json({ data: evaluationMethod });
    })
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
