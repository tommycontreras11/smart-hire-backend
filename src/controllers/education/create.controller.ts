import { Request, Response } from "express";
import { createEducationService } from "../../services/education/create.service";
import { statusCode } from "../../utils/status.util";

export const createEducationController = async (
  req: Request,
  res: Response
) => {
  const { candidateUUID } = req.params
  
  createEducationService(candidateUUID, req.body)
    .then((data) => res.status(statusCode.OK).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
