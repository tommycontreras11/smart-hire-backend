import { Request, Response } from "express";
import { getOneLanguageService } from "../../services/language/getOne.service";
import { statusCode } from "../../utils/status.util";

export const getOneLanguageController = async (req: Request, res: Response) => {
  const { uuid } = req.params;

  getOneLanguageService({
    where: {
      uuid,
    },
  })
    .then((data) => {
      const language = {
        uuid: data.uuid,
        name: data.name,
        status: data.status,
      };

      res.status(statusCode.OK).json({ data: language });
    })
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
