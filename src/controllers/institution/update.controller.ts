import { Request, Response } from "express";
import { updateInstitutionService } from "../../services/institution/update.service";
import { statusCode } from "../../utils/status.util";

export const updateInstitutionController = async (req: Request, res: Response) => {
  const { uuid } = req.params;

  updateInstitutionService(uuid, req.body)
    .then((data) => res.status(statusCode.OK).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
