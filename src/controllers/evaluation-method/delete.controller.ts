import { Request, Response } from "express";
import { deleteEvaluationMethodService } from "../../services/evaluation-method/delete.service";
import { statusCode } from "../../utils/status.util";

export const deleteEvaluationMethodController = async (req: Request, res: Response) => {
  const { uuid } = req.params;

  deleteEvaluationMethodService(uuid)
    .then((data) => res.status(statusCode.OK).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
