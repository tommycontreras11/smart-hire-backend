import { Request, Response } from "express";
import { getOneTrainingService } from "../../services/training/getOne.service";
import { statusCode } from "../../utils/status.util";

export const getOneTrainingController = async (req: Request, res: Response) => {
  const { uuid } = req.params;

  getOneTrainingService({
    where: {
      uuid,
    },
  })
    .then((data) => {
      const training = {
        uuid: data.uuid,
        name: data.name,
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
