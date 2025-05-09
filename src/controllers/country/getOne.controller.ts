import { Request, Response } from "express";
import { getOneCountryService } from "../../services/country/getOne.service";
import { statusCode } from "../../utils/status.util";

export const getOneCountryController = async (req: Request, res: Response) => {
  const { uuid } = req.params;

  getOneCountryService({
    where: {
      uuid,
    },
  })
    .then((data) => {
      const country = {
        uuid: data.uuid,
        name: data.name,
        status: data.status,
      };

      res.status(statusCode.OK).json({ data: country });
    })
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
