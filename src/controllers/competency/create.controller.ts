import { Request, Response } from "express";
import { createCompetencyService } from "../../services/competency/create.service";
import { statusCode } from "../../utils/status.util";

export const createCompetencyController = async (req: Request, res: Response) => {
  createCompetencyService(req.body)
    .then((data) => res.status(statusCode.CREATED).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
