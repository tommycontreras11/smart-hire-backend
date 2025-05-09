import { Request, Response } from "express";
import { updateLanguageService } from "../../services/language/update.service";
import { statusCode } from "../../utils/status.util";

export const updateLanguageController = async (req: Request, res: Response) => {
  const { uuid } = req.params;

  updateLanguageService(uuid, req.body)
    .then((data) => res.status(statusCode.OK).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
