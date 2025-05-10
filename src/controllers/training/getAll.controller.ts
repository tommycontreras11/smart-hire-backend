import { Request, Response } from "express";
import { getAllTrainingService } from "../../services/training/getAll.service";
import { statusCode } from "../../utils/status.util";

export const getAllTrainingController = async (_req: Request, res: Response) => {
  getAllTrainingService({})
    .then((data) => {
      const countries = data.map((training) => ({
        uuid: training.uuid,
        name: training.name,
        status: training.status,
      }));

      res.status(statusCode.OK).json({ data: countries });
    })
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
