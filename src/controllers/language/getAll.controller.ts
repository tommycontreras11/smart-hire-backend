import { Request, Response } from "express";
import { getAllLanguageService } from "../../services/language/getAll.service";
import { statusCode } from "../../utils/status.util";

export const getAllLanguageController = async (_req: Request, res: Response) => {
  getAllLanguageService({})
    .then((data) => {
      const languages = data.map((language) => ({
        uuid: language.uuid,
        name: language.name,
        status: language.status,
      }));

      res.status(statusCode.OK).json({ data: languages });
    })
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
