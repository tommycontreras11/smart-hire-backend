import { Request, Response } from "express";
import { getOneTrainingService } from "../../services/training/getOne.service";
import { statusCode } from "../../utils/status.util";

export const getOneTrainingController = async (req: Request, res: Response) => {
  const { uuid } = req.params;

  getOneTrainingService({
    where: {
      uuid,
    },
    relations: {
      institution: true,
    }
  })
    .then((data) => {
      const training = {
        uuid: data.uuid,
        name: data.name,
        description: data.description,
        level: data.level,
        date_from: data.date_from,
        date_to: data.date_to,
        institution: {
          uuid: data.institution.uuid,
          name: data.institution.name,
        },
        status: data.status,
      };

      res.status(statusCode.OK).json({ data: training });
    })
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
