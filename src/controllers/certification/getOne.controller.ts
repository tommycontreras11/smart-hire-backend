import { Request, Response } from "express";
import { getOneCertificationService } from "../../services/certification/getOne.service";
import { statusCode } from "../../utils/status.util";

export const getOneCertificationController = async (
  req: Request,
  res: Response
) => {
  const { uuid } = req.params;

  getOneCertificationService({
    where: {
      uuid,
    },
  })
    .then((data) => {
      const certification = {
        uuid: data.uuid,
        name: data.name,
        status: data.status,
      };
      
    })
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
