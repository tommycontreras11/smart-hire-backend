import { Request, Response } from "express";
import { getOneCompetencyService } from "../../services/competency/getOne.service";
import { statusCode } from "../../utils/status.util";

export const getOneCompetencyController = async (req: Request, res: Response) => {
  const { uuid } = req.params;

  getOneCompetencyService({
    where: {
      uuid,
    },
  })
    .then((data) => {
      const competency = {
        uuid: data.uuid,
        name: data.name,
        status: data.status,
      };

      res.status(statusCode.OK).json({ data: competency });
    })
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
