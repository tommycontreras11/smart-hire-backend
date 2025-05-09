import { Request, Response } from "express";
import { createLanguageService } from "../../services/language/create.service";
import { statusCode } from "../../utils/status.util";

export const createLanguageController = async (req: Request, res: Response) => {
  createLanguageService(req.body)
    .then((data) => res.status(statusCode.CREATED).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
