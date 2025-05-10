import { Request, Response } from "express";
import { getAllCountryService } from "../../services/country/getAll.service";
import { statusCode } from "../../utils/status.util";

export const getAllCountryController = async (_req: Request, res: Response) => {
  getAllCountryService({})
    .then((data) => {
      const countries = data.map((country) => ({
        uuid: country.uuid,
        name: country.name,
        status: country.status,
      }));

      res.status(statusCode.OK).json({ data: countries });
    })
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
