import { Request, Response } from "express";
import { updateTrainingService } from "../../services/training/update.service";
import { statusCode } from "../../utils/status.util";

export const updateTrainingController = async (req: Request, res: Response) => {
  const { uuid } = req.params;

  updateTrainingService(uuid, req.body)
    .then((data) => res.status(statusCode.OK).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
