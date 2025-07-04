import { Request, Response } from "express";
import { createCertificationService } from "../../services/certification/create.service";
import { statusCode } from "../../utils/status.util";

export const createCertificationController = async (
  req: Request,
  res: Response
) => {
  const { candidateUUID } = req.params;

  createCertificationService(candidateUUID, req.body)
    .then((data) => res.status(statusCode.OK).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
