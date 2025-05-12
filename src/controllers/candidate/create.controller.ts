import { Request, Response } from "express";
import { createCandidateService } from "../../services/candidate/create.service";
import { statusCode } from "../../utils/status.util";

export const createCandidateController = async (req: Request, res: Response) => {
  createCandidateService(req.body)
    .then((data) => res.status(statusCode.CREATED).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
