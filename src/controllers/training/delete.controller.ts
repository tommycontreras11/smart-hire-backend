import { Request, Response } from "express";
import { deleteTrainingService } from "../../services/training/delete.service";
import { statusCode } from "../../utils/status.util";

export const deleteTrainingController = async (req: Request, res: Response) => {
  const { uuid } = req.params;

  deleteTrainingService(uuid)
    .then((data) => res.status(statusCode.OK).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
