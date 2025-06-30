import { Request, Response } from "express";
import { deleteCertificationService } from "../../services/certification/delete.service";
import { statusCode } from "../../utils/status.util";

export const deleteCertificationController = async (
  req: Request,
  res: Response
) => {
  const { uuid } = req.params;

  deleteCertificationService(uuid)
    .then((data) => res.status(statusCode.OK).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
