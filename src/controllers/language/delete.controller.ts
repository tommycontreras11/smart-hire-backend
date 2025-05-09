import { Request, Response } from "express";
import { deleteLanguageService } from "../../services/language/delete.service";
import { statusCode } from "../../utils/status.util";

export const deleteLanguageController = async (req: Request, res: Response) => {
  const { uuid } = req.params;

  deleteLanguageService(uuid)
    .then((data) => res.status(statusCode.OK).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
