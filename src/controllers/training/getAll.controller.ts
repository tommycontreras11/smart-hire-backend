import { Request, Response } from "express";
import { getAllTrainingService } from "../../services/training/getAll.service";
import { statusCode } from "../../utils/status.util";

export const getAllTrainingController = async (_req: Request, res: Response) => {
  getAllTrainingService({
    relations: {
      institution: true,
    }
  })
    .then((data) => {
      const training = data.map((training) => ({
        uuid: training.uuid,
        name: training.name,
        description: training.description,
        level: training.level,
        date_from: training.date_from,
        date_to: training.date_to,
        institution: {
          uuid: training.institution.uuid,
          name: training.institution.name,
        },
        status: training.status,
      }));

      res.status(statusCode.OK).json({ data: training });
    })
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
