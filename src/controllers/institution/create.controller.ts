import { Request, Response } from "express";
import { createInstitutionService } from "../../services/institution/create.service";
import { statusCode } from "../../utils/status.util";

export const createInstitutionController = async (req: Request, res: Response) => {
  createInstitutionService(req.body)
    .then((data) => res.status(statusCode.CREATED).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
