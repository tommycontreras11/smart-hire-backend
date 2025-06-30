import { Request, Response } from "express";
import { updateCertificationService } from "../../services/certification/update.service";
import { statusCode } from "../../utils/status.util";

export const updateCertificationController = async (
  req: Request,
  res: Response
) => {
  const { uuid } = req.params;

  updateCertificationService(uuid, req.body)
    .then((data) => res.status(statusCode.OK).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
