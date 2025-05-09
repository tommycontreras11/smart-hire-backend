import { Request, Response } from "express";
import { getAllCountryService } from "../../services/country/getAll.service";
import { statusCode } from "../../utils/status.util";

export const getAllCountryController = async (_req: Request, res: Response) => {
  getAllCountryService({})
    .then((data) => {
      const countries = data.map((c) => ({
        uuid: c.uuid,
        name: c.name,
        status: c.status,
      }));

      res.status(statusCode.OK).json({ data: countries });
    })
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
