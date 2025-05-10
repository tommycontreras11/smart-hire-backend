import { Request, Response } from "express";
import { getAllCompetencyService } from "../../services/competency/getAll.service";
import { statusCode } from "../../utils/status.util";

export const getAllCompetencyController = async (_req: Request, res: Response) => {
  getAllCompetencyService({})
    .then((data) => {
      const competencies = data.map((competency) => ({
        uuid: competency.uuid,
        name: competency.name,
        status: competency.status,
      }));

      res.status(statusCode.OK).json({ data: competencies });
    })
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
