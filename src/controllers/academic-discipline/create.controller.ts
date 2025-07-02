import { Request, Response } from "express";
import { createAcademicDisciplineService } from "../../services/academic-discipline/create.service";
import { statusCode } from "../../utils/status.util";

export const createAcademicDisciplineController = async (req: Request, res: Response) => {
  createAcademicDisciplineService(req.body)
    .then((data) => res.status(statusCode.CREATED).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
