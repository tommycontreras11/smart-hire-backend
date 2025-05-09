import { Request, Response } from "express";
import { deleteCountryService } from "../../services/country/delete.service";
import { statusCode } from "../../utils/status.util";

export const deleteCountryController = async (req: Request, res: Response) => {
  const { uuid } = req.params;

  deleteCountryService(uuid)
    .then((data) => res.status(statusCode.OK).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
