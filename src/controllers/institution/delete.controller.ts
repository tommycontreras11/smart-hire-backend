import { Request, Response } from "express";
import { deleteInstitutionService } from "../../services/institution/delete.service";
import { statusCode } from "../../utils/status.util";

export const deleteInstitutionController = async (req: Request, res: Response) => {
  const { uuid } = req.params;

  deleteInstitutionService(uuid)
    .then((data) => res.status(statusCode.OK).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
