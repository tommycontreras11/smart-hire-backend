import { Request, Response } from "express";
import { updateCountryService } from "../../services/country/update.service";
import { statusCode } from "../../utils/status.util";

export const updateCountryController = async (req: Request, res: Response) => {
  const { uuid } = req.params;

  updateCountryService(uuid, req.body)
    .then((data) => res.status(statusCode.OK).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
